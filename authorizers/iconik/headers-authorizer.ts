import { getEnv } from '@helper/environment';
import { errorHandler } from '@helper/error-handler';
import { log } from '@helper/logger';
import { IconikService } from '@workflowwin/iconik-api';
import { APIGatewayAuthorizerResult, Handler } from 'aws-lambda';

// @ts-ignore
export const iconikAuthorizer: Handler = async (event, context: APIGatewayAuthorizerResult<unknown>) => {
  log('event, context', event, context);
  try {
    const authToken = event.headers['auth-token'];
    const iconikUrl = getEnv('ICONIK_URL');
    const appId = getEnv('ICONIK_APP_ID');
    const systemDomainId = getEnv('ICONIK_DOMAIN_ID');

    const iconikService = new IconikService({
      authToken,
      iconikUrl,
      appId,
      systemDomainId,
    });
  } catch (e) {
    errorHandler(e);
  }
};
