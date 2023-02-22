// DELETE THIS FILE
import { AWSPartitial } from '../types';

export const deployTestConfig: AWSPartitial = {
  functions: {
    deployTest: {
      handler: 'api/deploy-test/handler.handler',
      memorySize: 128,
      events: [
        {
          httpApi: {
            path: '/test',
            method: 'get',
          },
        },
      ],
    },
  },
};
