import { APIGatewayAuthorizerResult } from 'aws-lambda';

export function generatePolicy<Context extends APIGatewayAuthorizerResult['context']>(
  principalId: string,
  effect: 'Allow' | 'Deny',
  resource: string,
  context: Context
): APIGatewayAuthorizerResult & { context: Context } {
  return {
    context,
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
}
