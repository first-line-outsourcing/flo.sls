import { getEnv } from '@helper/environment';
import { IconikCredentialsStore } from '@services/IconikCredentialsStore';
import '@workflowwin/iconik-api/dist/src/client-extensions/bootstrap';
import { IconikClient } from '@workflowwin/iconik-api/dist/src/iconik-client.interface';
import { buildCustomActionsSchema } from './schemas/custom-actions';
import { metadataSchema } from './schemas/metadata';

export class InitManager {
  private iconikCredentialsStore = new IconikCredentialsStore();

  constructor(private iconikClient: IconikClient) {
  }

  async init() {
    const credentials = await this.iconikCredentialsStore.get();
    const metadata = this.iconikClient.extensions.bootstrap.createMetadataBootstrap(metadataSchema);
    const result = await metadata.bootstrap();
    const customActions = this.iconikClient.extensions.bootstrap.createCustomActionsBootstrap(buildCustomActionsSchema(
      credentials.appId,
      getEnv('BASE_HTTP_API_URL'),
      (result.views![0] as any).id,
    ));
    await customActions.bootstrap();
  }
}