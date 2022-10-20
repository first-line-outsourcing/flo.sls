import type { AWS } from '@serverless/typescript';
import { GetAtt, Ref, Sub } from './config/serverless/cf-intristic-fn';
import { examplesConfig } from './config/serverless/parts/examples';
import { getMediaInfoConfig } from './config/serverless/parts/get-media-info';
import { jobsConfig } from './config/serverless/parts/jobs';
import { restApiCorsConfig } from './config/serverless/parts/rest-api-cors';
import { iconikAppAdminConfig } from './config/serverless/parts/iconik-app-admin';
import { usersConfig } from './config/serverless/parts/users';
import { joinParts } from './config/serverless/utils';

const DEPLOYMENT_BUCKET = 'clients-serverless-deployment-bucket';
const CLIENT = '${file(./env.yml):${self:provider.stage}.CLIENT}';
const SERVICE_NAME = '${file(./env.yml):${self:provider.stage}.SERVICE_NAME}';
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
    environment: {
      STAGE,
      BASE_HTTP_API_URL: GetAtt('HttpApi.ApiEndpoint'),
      API_URL: Sub('https://${gatewayId}.execute-api.${region}.${suffix}/${self:provider.stage}/', {
        gatewayId: Ref('ApiGatewayRestApi'),
        region: Ref('AWS::Region'),
        suffix: Ref('AWS::URLSuffix'),
      }),
    },
    tags: {
      client: CLIENT,
    },
    logs: {
      httpApi: true,
    },
    apiGateway: {
      // need to be set to get free up resources feature work
      disableDefaultEndpoint: false,
    },
    httpApi: {
      useProviderTags: true,
      payload: '2.0',
      cors: true,
      // need to be set to get free up resources feature work
      disableDefaultEndpoint: false,
    },
    deploymentBucket: {
      name: DEPLOYMENT_BUCKET,
    },
    deploymentPrefix: `${SERVICE_NAME}-${STAGE}`,
  },
  package: {
    individually: true,
    patterns: ['bin/*', '.env'],
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      metafile: false,
      // If you want to debug the output than turn this on.
      // In other cases keep it off because serverless-esbuild
      // dont update extra files if they already exists in .esbuild folder.
      // Extra files are files that you define in package.patterns settings.
      keepOutputDirectory: false,
      packager: 'npm',
      inject: ['loadenv.ts'],
      plugins: 'esbuild-plugins.js',
      watch: {
        pattern: ['api/**/*.ts', 'helper/**/*.ts', 'interfaces/**/*.ts', 'models/**/*.ts', 'services/**/*.ts'],
      },
    },
    prune: {
      automatic: true,
      number: 3,
    },
    envFiles: ['env.yml'],
    envEncryptionKeyId: {
      local: '${file(./kms_key.yml):local}',
      dev: '${file(./kms_key.yml):dev}',
      test: '${file(./kms_key.yml):test}',
      prod: '${file(./kms_key.yml):prod}',
    },
    'serverless-offline': {
      ignoreJWTSignature: true,
    },
    // s3: {
    //   host: '0.0.0.0',
    //   port: 8001,
    //   directory: '/tmp',
    // },
    // capacities: [
    //   {
    //     table: 'UsersTable',
    //     read: {
    //       minimum: 5,
    //       maximum: 100,
    //       usage: 0.75,
    //     },
    //     write: {
    //       minimum: 5,
    //       maximum: 100,
    //       usage: 0.75,
    //     },
    //   },
    //   {
    //     table: 'JobsTable',
    //     index: ['ProducerIdGlobalIndex', 'CrewIdGlobalIndex'],
    //     read: {
    //       minimum: 5,
    //       maximum: 100,
    //       usage: 0.75,
    //     },
    //     write: {
    //       minimum: 5,
    //       maximum: 100,
    //       usage: 0.75,
    //     },
    //   },
    // ],
    // 'serverless-offline-sns': {
    //   port: 4002,
    //   debug: false,
    // },
    // 'serverless-offline-sqs': {
    //   autoCreate: true,
    //   apiVersion: '2012-11-05',
    //   endpoint: 'http://0.0.0.0:9324',
    //   region: '${file(./env.yml):${self:provider.stage}.REGION}',
    //   accessKeyId: 'root',
    //   secretAccessKey: 'root',
    //   skipCacheInvalidation: false,
    // },
  },
  plugins: [
    '@redtea/serverless-env-generator',
    'serverless-esbuild',
    'serverless-offline-sqs',
    'serverless-offline',
    // 'serverless-offline-sns',
    // 'serverless-s3-local',
    'serverless-prune-plugin',
  ],
};

module.exports = joinParts(masterConfig, [
  iconikAppAdminConfig,
  restApiCorsConfig,
  getMediaInfoConfig,
  jobsConfig,
  usersConfig,
  examplesConfig,
]);
