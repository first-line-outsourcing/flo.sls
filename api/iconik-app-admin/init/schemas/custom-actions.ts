import { getEnv, getStage } from '@helper/environment';
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
        title: `[${getEnv('SERVICE_NAME')}:${getStage()}] Update app token`,
        context: 'NONE',
        type: 'POST',
        app_id: appId,
        url: `${baseApiUrl}api/iconik-app-admin/update-app-token`,
        metadata_view: metadataViewId
      },
    },
  ];
}