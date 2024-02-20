import { IconikCredentials, IconikCredentialsStorage } from '@services/IconikCredentialsStorage';
import { CustomActionPayload } from '@workflowwin/iconik-api/dist/src/assets/assets-methods';

const defaultFieldsMapping = {
  win_IconikAppID: 'appId',
  win_IconikAppToken: 'appAuthToken',
};

export class UpdateAppTokenManager {
  private iconikCredentialsStore = new IconikCredentialsStorage();

  /**
   * Updates app token in the SSM parameters store.
   *
   * @param {CustomActionPayload} body
   * @returns {Promise<void>}
   */
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