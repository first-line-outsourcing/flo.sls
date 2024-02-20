import './config/serverless/stage-loader';
import type { AWS } from '@serverless/typescript';
import { deployTestConfig } from './config/serverless/parts/deploy-test';
import { iconikAppAdminConfig } from './config/serverless/parts/iconik-app-admin';
import { GetAtt, Ref, Sub } from './config/serverless/cf-intristic-fn';
import { getStage, joinParts } from './config/serverless/utils';

const DEPLOYMENT_BUCKET = 'clients-serverless-deployment-bucket';
const CLIENT = '${param:CLIENT}';
const SERVICE_NAME = `template-win-sls`;
const STAGE = '${opt:stage, "dev"}';
const REGION = '${param:REGION}';
const PROFILE = '${param:PROFILE}';

const masterConfig: AWS = {
  service: SERVICE_NAME, // See https://www.serverless.com/framework/docs/guides/parameters#stage-parameters
  params: {
    // default parameters
    default: {
      REGION: 'us-east-1',
      CLIENT: 'WIN',
      PROFILE: 'win',
    },
    dev: {},
    prod: {},
    local: {
      IS_OFFLINE: true,
      OFFLINE_API_BASE_URL: 'http://localhost:3000/local/',
    },
  },
  configValidationMode: 'warn',
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    stage: STAGE,
    // @ts-ignore
    region: REGION,
    profile: PROFILE,
    environment: {
      SERVICE_NAME: '${self:service}',
      STAGE,
      BASE_HTTP_API_URL: GetAtt('HttpApi.ApiEndpoint'), // API_URL: Sub('https://${gatewayId}.execute-api.${region}.${suffix}/${self:provider.stage}/', {
      //   gatewayId: Ref('ApiGatewayRestApi'),
      //   region: Ref('AWS::Region'),
      //   suffix: Ref('AWS::URLSuffix'),
      // }),
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
      payload: '2.0',
      cors: true, // need to be set to get free up resources feature work
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
      // Load stage specific key only
      [getStage()]: `\${file(./kms_key.yml):${getStage()}}`,
    },
    'serverless-offline': {
      ignoreJWTSignature: true,
    },
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
    //   region: '${param:REGION}',
    //   accessKeyId: 'root',
    //   secretAccessKey: 'root',
    //   skipCacheInvalidation: false,
    // },
  },
  plugins: [
    '@redtea/serverless-env-generator',
    'serverless-esbuild',
    'serverless-offline',
    // 'serverless-offline-sqs',
    // 'serverless-offline-sns',
    'serverless-prune-plugin',
  ],
};

module.exports = joinParts(masterConfig, [iconikAppAdminConfig, /*DELETE THIS >*/ deployTestConfig]);
