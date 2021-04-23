import { isStage } from '@helper/environment';
import * as dynamoose from 'dynamoose';

if (isStage('local')) {
  dynamoose.aws.sdk.config.update({
    accessKeyId: 'local',
    secretAccessKey: 'local',
    region: 'us-east-1',
  });
  dynamoose.aws.ddb.local('http://localhost:8000');
}

export { dynamoose };
