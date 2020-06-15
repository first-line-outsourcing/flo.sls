import { IconikService } from '@workflowwin/iconik-api';

export function createIconikService(options?, request?) {
  const iconikOptions = {
    appId: process.env.ICONIK_APP_ID as string,
    authToken: request ? request.headers['Auth-Token'] || request.headers['auth-token'] : process.env.ICONIK_TOKEN,
    iconikUrl: process.env.ICONIK_URL as string,
    systemDomainId: process.env.ICONIK_SYSTEM_DOMAIN_ID,
    ...options,
  };

  return new IconikService(iconikOptions);
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
