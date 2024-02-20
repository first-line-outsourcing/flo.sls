import type { AWS } from '@serverless/typescript';

const DEPLOYMENT_BUCKET = 'clients-serverless-deployment-bucket';
const CLIENT = '${file(./env.yml):${self:provider.stage}.CLIENT}';
const SERVICE_NAME = `template-sls`;
const STAGE = '${opt:stage, "dev"}';
const REGION = '${file(./env.yml):${self:provider.stage}.REGION}';
const PROFILE = '${file(./env.yml):${self:provider.stage}.PROFILE}';

const masterConfig: AWS = {
  service: SERVICE_NAME,
  configValidationMode: 'warn',
  variablesResolutionMode: '20210326',
  unresolvedVariablesNotificationMode: 'error',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: STAGE,
    lambdaHashingVersion: '20201221',
    // @ts-ignore
    region: REGION,
    profile: PROFILE,
    tags: {
      client: CLIENT,
    },
    deploymentBucket: {
      skipPolicySetup: true,
      name: DEPLOYMENT_BUCKET,
    },
    deploymentPrefix: `${SERVICE_NAME}-${STAGE}`,
  },
  resources: {
    Resources: {
      // Use to keep REST API
      // ApiGatewayRestApi: {
      //   Type: 'AWS::ApiGateway::RestApi',
      //   Properties: {
      //     Name: '${self:provider.stage}-${self:service}',
      //     EndpointConfiguration: {
      //       Types: [
      //         'EDGE'
      //       ]
      //     },
      //     DisableExecuteApiEndpoint: true,
      //     Policy: '',
      //   },
      // },
      // Use to keep HTTP API
      HttpApi: {
        Type: 'AWS::ApiGatewayV2::Api',
        Properties: {
          Name: '${self:provider.stage}-${self:service}',
          ProtocolType: 'HTTP',
          DisableExecuteApiEndpoint: true,
        },
      },
    },
  },
};

module.exports = masterConfig;
