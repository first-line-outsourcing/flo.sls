import { CustomActionPayload } from '@workflowwin/iconik-api/dist/src/assets/assets-methods';
import { authorizeIconikRequest, IconikContext } from '../../helper/authorizers/iconik/context';

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

export async function authorizeIconikCustomAction(customActionBody: Payload): Promise<IconikContext> {
  const { user_id: callerId, system_domain_id: systemDomainId, auth_token: authToken } = customActionBody;

  return authorizeIconikRequest(authToken || '', systemDomainId, callerId);
}
