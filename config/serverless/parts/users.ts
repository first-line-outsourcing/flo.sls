import { AWSPartitial } from '../types';

export const usersConfig: AWSPartitial = {
  params: {
    default: {
      USERS_TABLE_NAME: 'Users-${sls:stage}',
      // ELASTIC_SEARCH_DOMAIN: '',
      // USER_POOL: '',
      // USER_POOL_CLIENT: '',
      // ELASTIC_SEARCH_INSTANCE_TYPE: '',
      // ELASTIC_SEARCH_INSTANCE_COUNT: '',
    },
    prod: {
      USERS_TABLE_NAME: 'Users',
    },
  },
  provider: {
    environment: {
      // USERS_TABLE_NAME: '${param:USERS_TABLE_NAME}',
      // USER_POOL_CLIENT: '${param:USER_POOL_CLIENT}',
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
          //   Resource: 'arn:aws:dynamodb:*:*:table/${param:USERS_TABLE_NAME}',
          // },
          // {
          //   Effect: 'Allow',
          //   Action: ['es:*'],
          //   Resource: [
          //     'arn:aws:es:*:*:domain/${param:ELASTIC_SEARCH_DOMAIN}',
          //     'arn:aws:es:*:*:domain/${param:ELASTIC_SEARCH_DOMAIN}/*',
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
      //       UserPoolName: '${param:USER_POOL}',
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
      //     ClientName: '${param:USER_POOL_CLIENT}',
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
      //     TableName: '${param:USERS_TABLE_NAME}',
      //     StreamSpecification: {
      //       StreamViewType: 'NEW_AND_OLD_IMAGES',
      //     },
      //   },
      // },
      // ElasticSearchUsersInstance: {
      //   Type: 'AWS::Elasticsearch::Domain',
      //   Properties: {
      //     DomainName: '${param:ELASTIC_SEARCH_DOMAIN}',
      //     EBSOptions: {
      //       EBSEnabled: true,
      //       VolumeType: 'gp2',
      //       VolumeSize: 10,
      //     },
      //     ElasticsearchClusterConfig: {
      //       InstanceType: '${param:ELASTIC_SEARCH_INSTANCE_TYPE}',
      //       InstanceCount: '${param:ELASTIC_SEARCH_INSTANCE_COUNT}',
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
};
