import '@workflowwin/iconik-api/dist/src/client-extensions/metadata';
import '@workflowwin/iconik-api/dist/src/client-extensions/assets';
import { IconikService } from '@workflowwin/iconik-api';
import { getEnv } from '@helper/environment';
import { CustomActionSchema } from '@workflowwin/iconik-api/dist/src/assets/assets-methods';
import { MetadataFieldSchema } from '@workflowwin/iconik-api/dist/src/metadata/metadata-methods';

const MDFAppID: MetadataFieldSchema = {
  label: 'iconik AppID',
  name: 'win_IconikAppID',
  description: 'WIN Automation',
  field_type: 'string',
};
const MDFToken: MetadataFieldSchema = {
  label: 'iconik Token',
  name: 'win_IconikAppToken',
  description: 'WIN Automation',
  field_type: 'string',
};
const MDVUpdateIconikCredentials = {
  name: 'Update iconik credentials',
  view_fields: [MDFAppID, MDFToken],
};

const CustomAction: CustomActionSchema = {
  context: 'NONE',
  title: `Update lambda environments`,
  url: `${getEnv('API_URL')}api/management/environment`,
  type: 'POST',
  description: 'Custom action for change Token and AppID',
};

export class EnvironmentInitService {
  constructor(private iconik: IconikService) {}

  async initialization() {
    await this.iconik.extensions.metadata.createMetadataFields([MDFAppID, MDFToken]);
    const view = await this.iconik.extensions.metadata.createMetadataView(MDVUpdateIconikCredentials);
    await this.iconik.extensions.metadata.addCategoriesToView(view.id!, ['custom_actions']);
    CustomAction.metadata_view = view.id;
    return await this.iconik.extensions.assets.createCustomAction(CustomAction);
  }
}
