# Serverless API



# NPM commands

- **deploy:dev**: deploy to the AWS dev environment
- **deploy:prod**: deploy to the AWS prod environment
- **deploy:local**: start local development environment

Add env.yml with following structure

```js
local:
  IS_OFFLINE: 'true'
  USERS_TABLE: '${self:service}-${opt:stage, self:provider.stage}-Users'
  JOBS_TABLE: '${self:service}-${opt:stage, self:provider.stage}-Jobs'
  USER_POOL: '${self:service}-${opt:stage, self:provider.stage}-User-Pool'
  USER_POOL_CLIENT: '${self:service}-${opt:stage, self:provider.stage}-User-Pool-Client'
  USER_POOL_CLIENT_ID: ''
  USER_POOL_ID: ''
  REGION: 'us-east-1'
  PROFILE: ''
  CLOUDFORMATION_NAME: '${self:service}-${opt:stage, self:provider.stage}'
  PHOTO_BUCKET: '${self:service}-${opt:stage, self:provider.stage}-photo'
  VERIFICATION_BUCKET: '${self:service}-${opt:stage, self:provider.stage}-verification-incoming'
  ELASTIC_SEARCH_DOMAIN: '${self:service}-${opt:stage, self:provider.stage}'
  ELASTIC_SEARCH_INSTANCE_COUNT: '3'
  ELASTIC_SEARCH_DEDICATE_MASTER_COUNT: '1'
  ELASTIC_SEARCH_INSTANCE_TYPE: 't2.small.elasticsearch'
  SOURCE_EMAIL: ''
  PAYPAL_MODE: 'sandbox'
  PAYPAL_CLIENT_ID: 'U'
  PAYPAL_CLIENT_SECRET: ''
  PAYPAL_PAYOUT_SQS: '${self:service}-${opt:stage, self:provider.stage}-payout'
  SNS_ANDROID_APPLICATION_ARN: 'arn:aws:sns:us-east-1:xxx:app/GCM/CRWAndroidApplication'
  SNS_IOS_APPLICATION_ARN: 'arn:aws:sns:us-east-1:xxx:app/APNS_SANDBOX/CRWIOSSandboxApplication'
dev:
  IS_OFFLINE: 'false'
  USERS_TABLE: '${self:service}-${opt:stage, self:provider.stage}-Users'
  JOBS_TABLE: '${self:service}-${opt:stage, self:provider.stage}-Jobs'
  USER_POOL: '${self:service}-${opt:stage, self:provider.stage}-User-Pool'
  USER_POOL_CLIENT: '${self:service}-${opt:stage, self:provider.stage}-User-Pool-Client'
  USER_POOL_CLIENT_ID: ''
  USER_POOL_ID: ''
  REGION: 'us-east-1'
  PROFILE: ''
  CLOUDFORMATION_NAME: '${self:service}-${opt:stage, self:provider.stage}'
  PHOTO_BUCKET: '${self:service}-${opt:stage, self:provider.stage}-photo'
  VERIFICATION_BUCKET: '${self:service}-${opt:stage, self:provider.stage}-verification-incoming'
  ELASTIC_SEARCH_DOMAIN: '${self:service}-${opt:stage, self:provider.stage}'
  ELASTIC_SEARCH_INSTANCE_COUNT: '1'
  ELASTIC_SEARCH_INSTANCE_TYPE: 't2.small.elasticsearch'
  SOURCE_EMAIL: ''
  PAYPAL_MODE: 'sandbox'
  PAYPAL_CLIENT_ID: ''
  PAYPAL_CLIENT_SECRET: ''
  PAYPAL_PAYOUT_SQS: '${self:service}-${opt:stage, self:provider.stage}-payout'
  SNS_ANDROID_APPLICATION_ARN: 'arn:aws:sns:us-east-1:xxx:app/GCM/CRWAndroidApplication'
  SNS_IOS_APPLICATION_ARN: 'arn:aws:sns:us-east-1:xxx:app/APNS_SANDBOX/CRWIOSSandboxApplication'
prod:
  IS_OFFLINE: 'false'
  USERS_TABLE: '${self:service}-${opt:stage, self:provider.stage}-Users'
  JOBS_TABLE: '${self:service}-${opt:stage, self:provider.stage}-Jobs'
  USER_POOL: '${self:service}-${opt:stage, self:provider.stage}-User-Pool'
  USER_POOL_CLIENT: '${self:service}-${opt:stage, self:provider.stage}-User-Pool-Client'
  USER_POOL_CLIENT_ID: ''
  USER_POOL_ID: ''
  REGION: 'us-east-1'
  PROFILE: ''
  CLOUDFORMATION_NAME: '${self:service}-${opt:stage, self:provider.stage}'
  PHOTO_BUCKET: '${self:service}-${opt:stage, self:provider.stage}-photo'
  VERIFICATION_BUCKET: '${self:service}-${opt:stage, self:provider.stage}-verification-incoming'
  ELASTIC_SEARCH_DOMAIN: '${self:service}-${opt:stage, self:provider.stage}'
  ELASTIC_SEARCH_INSTANCE_COUNT: '2'
  ELASTIC_SEARCH_INSTANCE_TYPE: 'm4.large.elasticsearch'
  SOURCE_EMAIL: ''
  PAYPAL_MODE: 'live'
  PAYPAL_CLIENT_ID: ''
  PAYPAL_CLIENT_SECRET: ''
  PAYPAL_PAYOUT_SQS: '${self:service}-${opt:stage, self:provider.stage}-payout'
  SNS_ANDROID_APPLICATION_ARN: 'arn:aws:sns:us-east-1:xxx:app/GCM/CRWAndroidApplication'
  SNS_IOS_APPLICATION_ARN: 'arn:aws:sns:us-east-1:xxx:app/APNS/CRWIOSApplication'
```

