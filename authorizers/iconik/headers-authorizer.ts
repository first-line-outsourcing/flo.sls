import { getEnv } from '@helper/environment';
import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';
import { IconikParams } from '@workflowwin/iconik-api';
import { APIGatewayAuthorizerResult } from 'aws-lambda';
import { getCallerAndOwner } from '../helper';
import { generatePolicy } from '../policy-generator';
import { IconikContext } from './interfaces/context';

export const iconikAuthorizer = async (event) => {
  log('[Iconik Authorizer]', event);
  try {
    const callerId: string = event.headers['User-Id'];
    const authToken: string = event.headers['auth-token'];

    const iconikParams: IconikParams = {
      authToken,
      iconikUrl: getEnv('ICONIK_URL'),
      appId: getEnv('ICONIK_APP_ID'),
      systemDomainId: getEnv('ICONIK_DOMAIN_ID'),
    };

    const { caller, appOwner }: IconikContext = await getCallerAndOwner(iconikParams, callerId);
    const context: APIGatewayAuthorizerResult['context'] = {
      ...iconikParams,
      callerId: caller.id,
      callerEmail: caller.email,
      ownerId: appOwner.id,
      ownerEmail: appOwner.email,
    };

    return generatePolicy(`user|${caller.id}`, 'Allow', event.methodArn, context);
  } catch (error) {
    errorHandler(error);
  }
};
