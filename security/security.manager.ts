import { AppError, CommonErrors } from '@helper/app-error';
import { CloudFormationService } from '@services/cloud-formation.service';
import { IconikService } from '@workflowwin/iconik-api';
import { MetadataFieldSchema } from '@workflowwin/iconik-api/dist/src/metadata/metadata-methods';
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
      throw new AppError(CommonErrors.BadRequest, 'Cannot initialize Security. Connect WIN Support team.');
    }
  }
}
