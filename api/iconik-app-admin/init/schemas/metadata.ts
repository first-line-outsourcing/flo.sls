import { getEnv, getStage } from '@helper/environment';
import { IconikMetadataBootstrapSchema } from '@workflowwin/iconik-api/dist/src/client-extensions/bootstrap';

export const metadataSchema: IconikMetadataBootstrapSchema = {
  fields: {
    win_IconikAppID: {
      properties: {
        description: 'WIN Automation',
        field_type: 'string',
        label: 'App ID',
      },
    },
    win_IconikAppToken: {
      properties: {
        description: 'WIN Automation',
        field_type: 'string',
        label: 'App Auth Token',
      },
    },
  },
  views: [
    {
      properties: {
        name: `[${getEnv('SERVICE_NAME')}:${getStage()}] Update app token`,
      },
      fields: {
        win_IconikAppID: {},
        win_IconikAppToken: {},
      },
      categories: ['custom_actions'],
    },
  ],
};
