import { getEnv } from '@helper/environment';
import { IconikService } from '@workflowwin/iconik-api';
import { IconikContext } from '../authorizers/iconik/context';

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

export function arrayToObject(array: any[], field: string): any {
  if (!array || !array.length) {
    return {};
  }
  return array.reduce((obj, item) => {
    obj[item[field]] = item;
    return obj;
  }, {});
}

export const messages = {
  error: {
    forbiddenPasswords: 'Password and password confirmation must be the same',
    invalidSearchOptions: 'Search options must have one or more options',
  },
};
