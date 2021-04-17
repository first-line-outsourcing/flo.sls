import { HttpBadRequestError } from '@errors/http';
import { getEnv } from '@helper/environment';
import { CloudFormationService } from '@services/cloud-formation.service';
import { IconikService } from '@workflowwin/iconik-api';
import { MetadataFieldSchema } from '@workflowwin/iconik-api/dist/src/metadata/metadata-methods';
import { CustomActionSchema } from '@workflowwin/iconik-api/src/assets/assets-methods';
import { WebhookResponseSchema } from '@workflowwin/iconik-api/src/notifications/notifications-methods';
import { SecurityService } from './security.service';

const refreshHoursField: MetadataFieldSchema = {
  field_type: 'integer',
  name: 'win_RefreshHours',
  label: 'Refresh Hours',
  required: true,
};

export class SecurityManager {
  private readonly service: SecurityService;

  constructor() {
    this.service = new SecurityService();
  }

  async initialization(iconikService: IconikService, cloudFormation: CloudFormationService) {
    try {
      const apiUrl = await cloudFormation.getServiceEndpoint();

      const field: MetadataFieldSchema = await iconikService.metadata.createMetadataField(refreshHoursField);
      const view = await iconikService.metadata.createMetadataView({
        name: 'win_RefreshHoursView',
        label: 'Set Token Refresh Time',
        view_fields: [field],
      });
      await iconikService.metadata.addCategoryToView(view.id, 'custom_actions');

      const customAction = await iconikService.assets.createCustomAction('NONE', {
        context: 'NONE',
        type: 'POST',
        title: 'Change Refresh Token Period',
        url: `${apiUrl}/api/security/change-refresh-token-period`,
        metadata_view: view.id,
      });
      // @ts-ignore
      const { groups_acl } = await iconikService.acls.getAclByObjectId(customAction.id, 'custom_actions');
      await Promise.all(
        groups_acl.map(
          async (acl) =>
            // @ts-ignore
            await iconikService.acls.removeGroupAcl(customAction.id, acl.group_id, 'custom_actions')
        )
      );
      return { message: 'Security Workflow successfully initialize.' };
    } catch (error) {
      throw new HttpBadRequestError('Cannot initialize Security. Connect WIN Support team.');
    }
  }

  async refreshToken(iconikService: IconikService): Promise<void> {
    const customActions: CustomActionSchema[] = (await iconikService.assets.getCustomActions()).objects.filter(
      (CA) => CA.type !== 'OPEN'
    );
    const webHooks: WebhookResponseSchema[] = (await iconikService.notifications.getWebhooks()).objects;

    const invalidationTokens: string[] = this.service.getTokensFromWHandCA(webHooks, customActions);

    const newToken: string = (await iconikService.auth.createAppToken(getEnv('ICONIK_APP_ID'))).token;
    await this.service.updateTokensInWHandCA(iconikService, webHooks, customActions, newToken);

    // TODO: send invalidationTokens to invalidate lambda
    console.log(invalidationTokens);
  }

  async invalidateTokens(iconikService: IconikService, tokens: string[]): Promise<void> {
    await Promise.all(
      tokens.map(async (token) => await iconikService.auth.deleteToken(getEnv('ICONIK_APP_ID'), token))
    );
  }
}
