import { HttpUnauthorizedError } from '@errors/http';
import { IconikParams } from '@workflowwin/iconik-api';
import { CustomActionPayload } from '@workflowwin/iconik-api/dist/src/assets/assets-methods';
import { getEnv } from '@helper/environment';
import { log } from '@helper/logger';
import { getCallerAndOwner } from '../helper';
import { IconikContext } from './interfaces/context';

type Payload = CustomActionPayload & { auth_token?: string };

/**
 * Iconik provides the auth token in request body, but custom authorizers don`t support request body.
 * So we need to check it in the Lambda function instead using API Gateway authorizers
 * How to use this authorizer:
 * const authContext = await authorizeWithIconikCustomAction(event.body);
 *
 * Then you can create IconikService with User's Auth Context or App Credentials stored in env
 * const iconik = createIconikClient(authContext);
 * or
 * const iconikClient = createIconikClient();
 *
 * @param {Payload} customActionBody
 * @returns {Promise<IconikContext>}
 */

export async function authorizeWithIconikCustomAction(customActionBody: Payload): Promise<IconikContext> {
  const { user_id: callerId, system_domain_id: systemDomainId, auth_token: authToken } = customActionBody;

  if (!authToken) {
    log('No auth token');
    throw new HttpUnauthorizedError('No auth token');
  }

  const requiredIconikDomainId = getEnv('ICONIK_DOMAIN_ID');
  if (requiredIconikDomainId !== systemDomainId) {
    log('Wrong domain id');
    throw new HttpUnauthorizedError('Wrong domain id');
  }

  const iconikParams: IconikParams = {
    authToken,
    systemDomainId,
    iconikUrl: getEnv('ICONIK_URL'),
    appId: getEnv('ICONIK_APP_ID'),
  };

  return await getCallerAndOwner(iconikParams, callerId);
}
