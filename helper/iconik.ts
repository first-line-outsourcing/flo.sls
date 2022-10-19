import { IconikContext } from '@helper/authorizers/iconik/context';
import { getEnv } from '@helper/environment';
import { IconikCredentialsStore } from '@services/IconikCredentialsStore';
import { IconikService } from '@workflowwin/iconik-api';

export async function createIconikClient(authContext?: IconikContext): Promise<IconikService> {
  if (authContext) {
    return new IconikService({
      systemDomainId: authContext.systemDomainId,
      appId: authContext.appId,
      iconikUrl: authContext.iconikUrl,
      authToken: authContext.authToken,
    });
  }

  const iconikCredentialsStore = new IconikCredentialsStore();
  const credentials = await iconikCredentialsStore.get();

  return new IconikService({
    systemDomainId: getEnv('ICONIK_DOMAIN_ID'),
    appId: credentials.appId,
    iconikUrl: getEnv('ICONIK_URL'),
    authToken: credentials.appAuthToken,
  });
}
