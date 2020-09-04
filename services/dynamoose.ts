import { log } from '@helper/logger';
import * as dynamoose from 'dynamoose';

if (process.env.IS_OFFLINE === 'true') {
  log('Local DynamoDB');
  dynamoose.aws.ddb.local('http://localhost:8000');
}

export { dynamoose };
