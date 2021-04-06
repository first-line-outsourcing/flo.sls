import { isStage } from '@helper/environment';
import * as dynamoose from 'dynamoose';

if (isStage('local')) {
  dynamoose.aws.ddb.local('http://localhost:8000');
}

export { dynamoose };
