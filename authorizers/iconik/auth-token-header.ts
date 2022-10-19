import { authorizeByAuthToken } from '@helper/authorizers/iconik/context';
import { debug, log } from '@helper/logger';
import {
  APIGatewayAuthorizerSimpleResult,
  APIGatewayRequestAuthorizerHttpApiPayloadV2Event,
} from '@interfaces/api-gateway-authorizer.interface';
import { Handler } from 'aws-lambda';

export const handler: Handler<
  APIGatewayRequestAuthorizerHttpApiPayloadV2Event,
  APIGatewayAuthorizerSimpleResult
> = async (event) => {
  log(event);

  const token = event.identitySource?.[0];

  if (token) {
    try {
      const context = await authorizeByAuthToken(token);

      return {
        isAuthorized: true,
        context,
      };
    } catch (error) {
      debug(error);
    }
  }

  return {
    isAuthorized: false,
  };
};
