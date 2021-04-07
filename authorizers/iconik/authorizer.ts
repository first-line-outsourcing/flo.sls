import { IconikService } from '@workflowwin/iconik-api';
import { CustomActionPayload } from '@workflowwin/iconik-api/dist/src/assets/assets-methods';
import { AppError, CommonErrors } from '@helper/app-error';
import { getEnv } from '@helper/environment';
import { log } from '@helper/logger';
import { IconikContext } from './context';

type Payload = CustomActionPayload & { auth_token?: string };

/**
 * iconik doesn't send Auth-Token in headers but sends it in the body
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

  const iconikUrl = getEnv('ICONIK_URL');
  const appId = getEnv('ICONIK_APP_ID');
  const requiredIconikDomainId = getEnv('ICONIK_DOMAIN_ID');

  if (!authToken) {
    log('No auth token');
    throw new AppError(CommonErrors.Unauthorized, 'Unauthorized');
  }

  if (requiredIconikDomainId !== systemDomainId) {
    log('Wrong domain id');
    throw new AppError(CommonErrors.Unauthorized, 'Unauthorized');
  }

  const iconik = new IconikService({
    authToken,
    iconikUrl,
    appId,
    systemDomainId,
  });

  const context: Partial<IconikContext> = {
    appId,
    authToken,
    iconikUrl,
    systemDomainId,
  };

  try {
    const owner = await iconik.users.getUserInfo();
    const caller = owner.id === callerId ? owner : await iconik.users.getUserById(callerId);

    context.caller = {
      id: caller.id!,
      email: caller.email,
    };

    context.appOwner = {
      id: owner.id!,
      email: owner.email,
    };
  } catch (error) {
    console.log(error);

    if (error.isAxiosError) {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          throw new AppError(CommonErrors.Unauthorized, 'Unauthorized');
        }

        throw new AppError(CommonErrors.BadRequest, `Iconik response with "${status}: ${error.response.statusText}"`);
      }
    }

    throw new AppError(CommonErrors.InternalServerError, 'Internal Server Error');
  }

  return context as IconikContext;
}
