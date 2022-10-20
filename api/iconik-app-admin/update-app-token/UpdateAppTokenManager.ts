import { IconikCredentials, IconikCredentialsStore } from '@services/IconikCredentialsStore';
import { CustomActionPayload } from '@workflowwin/iconik-api/dist/src/assets/assets-methods';
import { MetadataOutputSchema } from '@workflowwin/iconik-api/dist/src/metadata/metadata-methods';
import { EnvironmentVariables } from 'aws-sdk/clients/lambda';

const defaultFieldsMapping = {
  win_IconikAppID: 'appId',
  win_IconikAppToken: 'appAuthToken'
};

export class UpdateAppTokenManager {
  private iconikCredentialsStore = new IconikCredentialsStore();

  async update(body: CustomActionPayload) {
    const credentials = this.parseBody(body);
    await this.iconikCredentialsStore.update(credentials);
  }

  private parseBody(body: CustomActionPayload): IconikCredentials {
    const metadataValues = body.metadata_values;
    const credentials = {};
    for (const field in metadataValues) {
      credentials[defaultFieldsMapping[field]] = metadataValues[field].field_values[0].value;
    }
    return credentials as IconikCredentials;
  }
}