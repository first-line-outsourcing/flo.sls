import { InputValidationError } from '@floteam/errors';
import { RuntimeError } from '@floteam/errors/runtime/runtime-error';
import { getEnv, getStage } from '@helper/environment';
import { debug } from '@helper/logger';
import { SSM } from 'aws-sdk';
import NodeCache from 'node-cache';

// Reduces number of requests to SSM services.
// How this works: https://docs.aws.amazon.com/lambda/latest/operatorguide/static-initialization.html
const cache = new NodeCache({
  stdTTL: 60,
  checkperiod: 80,
});

export interface IconikCredentials {
  appId: string;
  appAuthToken: string;
}

export class IconikCredentialsStore {
  private ssm = new SSM({
    maxRetries: 5,
    retryDelayOptions: {
      base: Math.ceil(1000 / 40),
    },
  });

  async get(): Promise<IconikCredentials> {
    if (cache.get('credentials')) {
      return cache.get('credentials') as IconikCredentials;
    }

    let result: SSM.GetParametersByPathResult;

    try {
      result = await this.ssm
        .getParametersByPath({
          Path: this.createParamPath(),
          WithDecryption: true,
        })
        .promise();
    } catch (error) {
      debug('get ssm parameters error=', error);
      throw new RuntimeError('Cannot get SSM parameters.');
    }

    const params: Partial<IconikCredentials> =
            result.Parameters?.reduce((out, param) => {
              const name = param.Name!.split('/').pop();
              switch (name) {
                case 'app-id':
                  out.appId = param.Value;
                  break;
                case 'app-auth-token':
                  out.appAuthToken = param.Value;
                  break;
              }
              return out;
            }, {} as Partial<IconikCredentials>) ?? {} as Partial<IconikCredentials>;

    if (!params.appId) {
      this.throwParamError('app-id', 'The App ID is empty');
    }

    if (!params.appAuthToken) {
      this.throwParamError('app-auth-token', 'The App Auth Token is empty');
    }

    return params as IconikCredentials;
  }

  async update(credentials: IconikCredentials) {
    try {
      await this.ssm
        .putParameter({
          Name: this.createParamPath('app-id'),
          Type: 'String',
          Value: credentials.appId,
          Overwrite: true,
        })
        .promise();
      await this.ssm
        .putParameter({
          Name: this.createParamPath('app-auth-token'),
          Value: credentials.appAuthToken,
          Type: 'SecureString',
          Overwrite: true,
        })
        .promise();
      cache.set('credentials', credentials);
    } catch (error) {
      debug('update ssm parameters error=', error);
      throw new RuntimeError('Cannot update SSM parameters.');
    }
  }

  private throwParamError(name: string, reason: string): never {
    throw new InputValidationError(
      `${reason}. Please check/add ${this.createParamPath(name)} SSM parameter.`
    );
  }

  private createParamPath(path?: string): string {
    return `/win/${getEnv('CLIENT')}/${getEnv('SERVICE_NAME')}/${getStage()}/iconik-credentials${path ? `/${path}` : ''}`;
  }
}