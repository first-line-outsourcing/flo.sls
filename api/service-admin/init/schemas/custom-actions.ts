import {IconikCustomActionBootstrapSchema} from '@workflowwin/iconik-api/dist/src/client-extensions/bootstrap';

export function buildCustomActionsSchema(
  appId: string,
  baseApiUrl: string,
  metadataViewId: string,
): IconikCustomActionBootstrapSchema[] {
  if (!baseApiUrl.endsWith('/')) {
    baseApiUrl = `${baseApiUrl}/`;
  }

  return [
    {
      properties: {
        title: 'Update iconik credentials',
        context: 'NONE',
        type: 'POST',
        app_id: appId,
        url: `${baseApiUrl}api/service-admin/update-iconik-credentials`,
        metadata_view: metadataViewId
      },
    },
  ];
}