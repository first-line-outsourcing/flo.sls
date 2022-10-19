import {IconikMetadataBootstrapSchema} from '@workflowwin/iconik-api/dist/src/client-extensions/bootstrap';

export const metadataSchema: IconikMetadataBootstrapSchema = {
  fields: {
    win_IconikAppID: {
      properties: {
        description:
          'WIN Automation',
        field_type: 'string',
        label: 'iconik App ID',
      },
    },
    win_IconikAppToken: {
      properties: {
        description:
          'WIN Automation',
        field_type: 'string',
        label: 'iconik App Auth Token',
      },
    },
  },
  views: [
    {
      properties: {
        name: 'Update iconik credentials',
      },
      fields: {
        win_IconikAppID: {},
        win_IconikAppToken: {},
      },
      categories: ['custom_actions'],
    }
  ]
};