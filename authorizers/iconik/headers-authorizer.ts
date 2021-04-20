import { getEnv } from '@helper/environment';
import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';
import { IconikParams } from '@workflowwin/iconik-api';
import { APIGatewayAuthorizerEvent, APIGatewayAuthorizerResult, Handler } from 'aws-lambda';
import { getCallerAndOwner } from './helper';
import { generatePolicy } from '../policy-generator';
import { IconikContext, IconikEnhancedAuthContext } from './interfaces/context';

export const iconikAuthorizer: Handler<
  APIGatewayAuthorizerEvent,
  (APIGatewayAuthorizerResult & { context: IconikEnhancedAuthContext }) | undefined
> = async (event, context) => {
  log('[Iconik Authorizer]', event);
  try {
    const callerId: string = event['headers']['User-Id'];
    const authToken: string = event['headers']['auth-token'];

    const iconikParams: IconikParams = {
      authToken,
      iconikUrl: getEnv('ICONIK_URL'),
      appId: getEnv('ICONIK_APP_ID'),
      systemDomainId: getEnv('ICONIK_DOMAIN_ID'),
    };

    const { caller, appOwner }: IconikContext = await getCallerAndOwner(iconikParams, callerId);
    const context: IconikEnhancedAuthContext = {
      ...iconikParams,
      callerId: caller.id,
      callerEmail: caller.email,
      ownerId: appOwner.id,
      ownerEmail: appOwner.email,
    };

    return generatePolicy<IconikEnhancedAuthContext | any>(`user|${caller?.id}`, 'Allow', event.methodArn, context);
  } catch (error) {
    errorHandler(error);
  }
};
