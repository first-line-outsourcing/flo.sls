import { HttpBadRequestError } from '@errors/http';
import { getEnv } from '@helper/environment';
import { log } from '@helper/logger';
import { IconikTokenInterface, IconikTokenModel, IconikTokenSchema } from '@models/DynamoDB/iconik-token.model';
import { CloudFormationService } from '@services/cloud-formation.service';
import { IconikService } from '@workflowwin/iconik-api';
import { MetadataFieldSchema } from '@workflowwin/iconik-api/dist/src/metadata/metadata-methods';
import { CustomActionSchema } from '@workflowwin/iconik-api/src/assets/assets-methods';
import { WebhookResponseSchema } from '@workflowwin/iconik-api/src/notifications/notifications-methods';
import { ScanResponse } from 'dynamoose/dist/DocumentRetriever';
import { SecurityService } from './security.service';
import * as AWS from 'aws-sdk';

const refreshHoursField: MetadataFieldSchema = {
  field_type: 'integer',
  name: 'win_RefreshHours',
  label: 'Refresh Hours',
  required: true,
};

export class SecurityManager {
  private readonly service: SecurityService;
  private readonly cloudWatchEvents = new AWS.CloudWatchEvents({ apiVersion: '2015-10-07' });

  constructor() {
    this.service = new SecurityService();
    AWS.config.update({ region: getEnv('REGION') });
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

      const { groups_acl } = await iconikService.acls.getAclByObjectId(customAction.id!, 'custom_actions');
      await Promise.all(
        groups_acl.map(
          async (acl) => await iconikService.acls.removeGroupAcl(customAction.id!, acl.group_id, 'custom_actions')
        )
      );
      return { message: 'Security Workflow successfully initialize.' };
    } catch (error) {
      log('initialize error', error);
      throw new HttpBadRequestError('Cannot initialize Security. Connect WIN Support team.');
    }
  }

  async changeRefreshTokenPeriod(
    refreshHours: string,
    refreshTokenLambdaARN: string,
    invalidateTokensLambdaARN: string
  ) {
    log('info changeRefreshTokenPeriod: ', refreshHours, refreshTokenLambdaARN, invalidateTokensLambdaARN);

    const params = {
      Name: 'DEMO_EVENT',
      RoleArn: refreshTokenLambdaARN,
      ScheduleExpression: 'rate(2 minutes)',
      State: 'ENABLED',
    };

    this.cloudWatchEvents.putRule(params, function (err, data) {
      if (err) {
        log('Error', err);
      } else {
        log('Success', data.RuleArn);
      }
    });
  }

  async refreshToken(iconikService: IconikService): Promise<{ message: string }> {
    const customActions: CustomActionSchema[] = (await iconikService.assets.getCustomActions()).objects.filter(
      (CA) => CA.type !== 'OPEN'
    );
    const webHooks: WebhookResponseSchema[] = (await iconikService.notifications.getWebhooks()).objects;

    const invalidationTokens: string[] = this.service.getTokensFromWHandCA(webHooks, customActions);

    const newToken: string = (await iconikService.auth.createAppToken(getEnv('ICONIK_APP_ID'))).token;
    await this.service.updateTokensInWHandCA(iconikService, webHooks, customActions, newToken);

    const saveInvalidationTokens: IconikTokenSchema[] = invalidationTokens.map((token: string) => {
      return { token };
    });
    const data = await IconikTokenModel.batchPut(saveInvalidationTokens);
    log('IconikTokenModel.batchPut', data);

    return { message: 'Refresh tokens successfully!' };
  }

  async invalidateTokens(iconikService: IconikService): Promise<{ message: string }> {
    const invalidationTokens: ScanResponse<IconikTokenInterface> = (await IconikTokenModel.scan().exec()) as ScanResponse<
      any
    >;

    await Promise.all(
      invalidationTokens.map(async ({ token, createdAt }) => {
        if (this.service.isInvalidateIconikToken(createdAt)) {
          await iconikService.auth.deleteToken(getEnv('ICONIK_APP_ID'), token);
          await IconikTokenModel.delete({ token });
        }
      })
    );

    return { message: 'Invalidate tokens successfully!' };
  }
}
