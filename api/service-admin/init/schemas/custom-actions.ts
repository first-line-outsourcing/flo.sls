import {IconikCustomActionBootstrapSchema} from '@workflowwin/iconik-api/dist/src/client-extensions/bootstrap';

export function buildCustomActionsSchema(
  appId: string,
  appAutoToken: string,
  baseApiUrl: string
): IconikCustomActionBootstrapSchema[] {
  if (!baseApiUrl.endsWith('/')) {
    baseApiUrl = `${baseApiUrl}/`;
  }

  return [
    {
      properties: {
        title: 'Update iconik environments',
        context: 'NONE',
        headers: {
          'auth-token': appAutoToken,
        },
        type: 'POST',
        app_id: appId,
        url: `${baseApiUrl}api/service-admin/update-iconik-credentials`,
      },
    },
  ];
}