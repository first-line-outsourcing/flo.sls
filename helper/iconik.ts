import { getEnv } from '@helper/environment';
import { IconikService } from '@workflowwin/iconik-api';
import { IconikContext } from '../authorizers/iconik/interfaces/context';

export function createIconikClient(authContext?: IconikContext): IconikService {
  if (authContext) {
    return new IconikService({
      systemDomainId: authContext.systemDomainId,
      appId: authContext.appId,
      iconikUrl: authContext.iconikUrl,
      authToken: authContext.authToken,
    });
  }

  return new IconikService({
    systemDomainId: getEnv('ICONIK_DOMAIN_ID'),
    appId: getEnv('ICONIK_APP_ID'),
    iconikUrl: getEnv('ICONIK_URL'),
    authToken: getEnv('ICONIK_APP_AUTH_TOKEN'),
  });
}
