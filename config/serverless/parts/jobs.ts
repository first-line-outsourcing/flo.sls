import { AWSPartitial } from '../types';

export const jobsConfig: AWSPartitial = {
  provider: {
    environment: {
      // JOBS_TABLE_NAME: '${self:custom.tablesNames.JobsTable.${self:provider.stage}}',
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
          //   Resource: [
          //     'arn:aws:dynamodb:*:*:table/${file(env.yml):${self:provider.stage}.JOBS_TABLE}',
          //     'arn:aws:dynamodb:*:*:table/${file(env.yml):${self:provider.stage}.JOBS_TABLE}/index/*',
          //   ],
          // },
        ],
      },
    },
  },
  resources: {
    Resources: {
      // JobsTable: {
      //   Type: 'AWS::DynamoDB::Table',
      //   DeletionPolicy: 'Retain',
      //   Properties: {
      //     AttributeDefinitions: [
      //       {
      //         AttributeName: 'id',
      //         AttributeType: 'S',
      //       },
      //       {
      //         AttributeName: 'producerId',
      //         AttributeType: 'S',
      //       },
      //       {
      //         AttributeName: 'crewId',
      //         AttributeType: 'S',
      //       },
      //       {
      //         AttributeName: 'status',
      //         AttributeType: 'S',
      //       },
      //     ],
      //     ProvisionedThroughput: {
      //       ReadCapacityUnits: 4,
      //       WriteCapacityUnits: 2,
      //     },
      //     KeySchema: [
      //       {
      //         AttributeName: 'id',
      //         KeyType: 'HASH',
      //       },
      //     ],
      //     GlobalSecondaryIndexes: [
      //       {
      //         IndexName: 'ProducerIdGlobalIndex',
      //         KeySchema: [
      //           {
      //             AttributeName: 'producerId',
      //             KeyType: 'HASH',
      //           },
      //           {
      //             AttributeName: 'status',
      //             KeyType: 'RANGE',
      //           },
      //         ],
      //         Projection: {
      //           ProjectionType: 'ALL',
      //         },
      //         ProvisionedThroughput: {
      //           ReadCapacityUnits: 4,
      //           WriteCapacityUnits: 2,
      //         },
      //       },
      //       {
      //         IndexName: 'CrewIdGlobalIndex',
      //         KeySchema: [
      //           {
      //             AttributeName: 'crewId',
      //             KeyType: 'HASH',
      //           },
      //           {
      //             AttributeName: 'status',
      //             KeyType: 'RANGE',
      //           },
      //         ],
      //         Projection: {
      //           ProjectionType: 'ALL',
      //         },
      //         ProvisionedThroughput: {
      //           ReadCapacityUnits: 4,
      //           WriteCapacityUnits: 2,
      //         },
      //       },
      //     ],
      //     BillingMode: 'PAY_PER_REQUEST',
      //     TableName: '${self:custom.tablesNames.JobsTable.${self:provider.stage}}',
      //     StreamSpecification: {
      //       StreamViewType: 'NEW_AND_OLD_IMAGES',
      //     },
      //   },
      // },
    },
  },
  custom: {
    // tablesNames: {
    //   JobsTable: {
    //     local: 'Jobs-local',
    //     dev: 'Jobs-dev',
    //     test: 'Jobs-test',
    //     prod: 'Jobs',
    //   },
    // },
  },
};
