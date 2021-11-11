import { AWSPartitial } from '../types';

export const usersConfig: AWSPartitial = {
  provider: {
    environment: {
      // USERS_TABLE_NAME: '${self:custom.tablesNames.UsersTable.${self:provider.stage}}',
    },
    iam: {
      role: {
        statements: [
          // {
          //   Effect: 'Allow',
          //   Action: [
          //     'dynamodb:DescribeTable',
          //     'dynamodb:Query',
          //     'dynamodb:Scan',
          //     'dynamodb:GetItem',
          //     'dynamodb:PutItem',
          //     'dynamodb:DeleteItem',
          //     'dynamodb:UpdateItem',
          //     'dynamodb:BatchGetItem',
          //     'dynamodb:BatchWriteItem',
          //   ],
          //   Resource: 'arn:aws:dynamodb:*:*:table/${file(env.yml):${self:provider.stage}.USERS_TABLE}',
          // },
          // {
          //   Effect: 'Allow',
          //   Action: ['es:*'],
          //   Resource: [
          //     'arn:aws:es:*:*:domain/${file(env.yml):${self:provider.stage}.ELASTIC_SEARCH_DOMAIN}',
          //     'arn:aws:es:*:*:domain/${file(env.yml):${self:provider.stage}.ELASTIC_SEARCH_DOMAIN}/*',
          //   ],
          // },
        ],
      },
    },
  },
  resources: {
    Resources: {
      // UserPool: {
      //   Type: 'AWS::Cognito::UserPool',
      //   Properties: {
      //     Properties: {
      //       UserPoolName: '${file(env.yml):${opt:stage, self:provider.stage}.USER_POOL}',
      //       UsernameAttributes: ['email'],
      //       AutoVerifiedAttributes: ['email'],
      //       Schema: [
      //         {
      //           Name: 'email',
      //         },
      //       ],
      //       AttributeDataType: 'String',
      //       Mutable: false,
      //       Required: true,
      //       Policies: {
      //         PasswordPolicy: {
      //           RequireLowercase: true,
      //         },
      //       },
      //       RequireSymbols: false,
      //       RequireNumbers: true,
      //       MinimumLength: 8,
      //       RequireUppercase: true,
      //       AdminCreateUserConfig: {
      //         UnusedAccountValidityDays: 60,
      //       },
      //     },
      //   },
      // },
      // UserPoolClient: {
      //   Type: 'AWS::Cognito::UserPoolClient',
      //   Properties: {
      //     ClientName: '${self:provider.environment.USER_POOL_CLIENT}',
      //     GenerateSecret: false,
      //     UserPoolId: Ref('UserPool'),
      //   },
      // },
      // UsersTable: {
      //   Type: 'AWS::DynamoDB::Table',
      //   DeletionPolicy: 'Retain',
      //   Properties: {
      //     AttributeDefinitions: [
      //       {
      //         AttributeName: 'id',
      //         AttributeType: 'S',
      //       },
      //     ],
      //     KeySchema: [
      //       {
      //         AttributeName: 'id',
      //         KeyType: 'HASH',
      //       },
      //     ],
      //     BillingMode: 'PAY_PER_REQUEST',
      //     TableName: '${self:custom.tablesNames.UsersTable.${self:provider.stage}}',
      //     StreamSpecification: {
      //       StreamViewType: 'NEW_AND_OLD_IMAGES',
      //     },
      //   },
      // },
      // ElasticSearchUsersInstance: {
      //   Type: 'AWS::Elasticsearch::Domain',
      //   Properties: {
      //     DomainName: '${file(env.yml):${self:provider.stage}.ELASTIC_SEARCH_DOMAIN}',
      //     EBSOptions: {
      //       EBSEnabled: true,
      //       VolumeType: 'gp2',
      //       VolumeSize: 10,
      //     },
      //     ElasticsearchClusterConfig: {
      //       InstanceType: '${file(env.yml):${opt:stage, self:provider.stage}.ELASTIC_SEARCH_INSTANCE_TYPE}',
      //       InstanceCount: '${file(env.yml):${opt:stage, self:provider.stage}.ELASTIC_SEARCH_INSTANCE_COUNT}',
      //       DedicatedMasterEnabled: false,
      //       ZoneAwarenessEnabled: false,
      //     },
      //     ElasticsearchVersion: 6.3,
      //   },
      // },
    },
    Outputs: {
      // UserPoolId: {
      //   Value: Ref('UserPool'),
      //   Export: {
      //     Name: '${self:provider.stage}UserPool::Id',
      //   },
      // },
      // UserPoolClientId: {
      //   Value: Ref('UserPoolClient'),
      //   Export: {
      //     Name: '${self:provider.stage}UserPoolClient::Id',
      //   },
      // },
    },
  },
  custom: {
    // tablesNames: {
    //   UsersTable: {
    //     local: 'Users-local',
    //     dev: 'Users-dev',
    //     test: 'Users-test',
    //     prod: 'Users',
    //   },
    // },
  },
};
