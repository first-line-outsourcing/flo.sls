import { getEnv } from '@helper/environment';
import '@workflowwin/iconik-api/dist/src/client-extensions/bootstrap';
import { IconikCredentialsStore } from '@services/IconikCredentialsStore';
import { IconikClient } from '@workflowwin/iconik-api/dist/src/iconik-client.interface';
import { buildCustomActionsSchema } from './schemas/custom-actions';
import { metadataSchema } from './schemas/metadata';

export class InitManager {
  constructor(private iconikClient: IconikClient) {
  }

  async init() {
    const metadata = this.iconikClient.extensions.bootstrap.createMetadataBootstrap(metadataSchema);
    const customActions = this.iconikClient.extensions.bootstrap.createCustomActionsBootstrap(buildCustomActionsSchema(
      'appid',
      'token',
      getEnv('BASE_HTTP_API_URL')
    ));

    await metadata.bootstrap();
    await customActions.bootstrap();
  }
}