import { getEnv } from '@helper/environment';
import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';
import { getCallerAndOwner } from '../helper';
import { generatePolicy } from '../policy-generator';
import { IconikContext } from './interfaces/context';

export const iconikAuthorizer = async (event) => {
  log('[Iconik Authorizer]', event);
  try {
    const authToken: string = event.headers['auth-token'];
    const caller: string = event.headers['User-Id'];

    const iconikUrl: string = getEnv('ICONIK_URL');
    const appId: string = getEnv('ICONIK_APP_ID');
    const systemDomainId: string = getEnv('ICONIK_DOMAIN_ID');

    const context: IconikContext = await getCallerAndOwner({ authToken, iconikUrl, appId, systemDomainId }, caller);

    return generatePolicy<IconikContext | any>(`user|${context.caller.id}`, 'Allow', event.methodArn, context);
  } catch (error) {
    errorHandler(error);
  }
};
