import { HttpBadRequestError } from '@errors/http';
import { log } from '@helper/logger';
import { CloudFormationService } from '@services/cloud-formation.service';
import { IconikService } from '@workflowwin/iconik-api';

export class ExampleOfUseAuthorizerManager {
  public async initialization(
    cloudFormation: CloudFormationService,
    iconikService: IconikService
  ): Promise<{ message: string }> {
    try {
      const apiUrl = await cloudFormation.getServiceEndpoint();

      await iconikService.assets.createCustomAction('NONE', {
        context: 'NONE',
        type: 'POST',
        title: 'Example Custom Action',
        url: `${apiUrl}/api/examples/use-authorizer`,
      });

      await iconikService.notifications.createWebhook({
        event_type: 'assets',
        realm: 'segments',
        name: 'Example WebHook',
        url: `${apiUrl}/api/examples/use-authorizer`,
      });

      return { message: 'ExampleOfUseAuthorizer Workflow successfully initialize.' };
    } catch (error) {
      log('initialize error', error);
      throw new HttpBadRequestError('Cannot initialize ExampleOfUseAuthorizer. Connect WIN Support team.');
    }
  }
}
