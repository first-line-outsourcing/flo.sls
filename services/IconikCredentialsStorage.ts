import { getEnv, getStage } from '@helper/environment';
import { debug } from '@helper/logger';
import { GetParametersByPathResult, SSM } from '@aws-sdk/client-ssm';
import NodeCache from 'node-cache';
import { InputValidationError, RuntimeError } from '@flopackages/errors';

// Reduces number of requests to external storage.
// How it works: https://docs.aws.amazon.com/lambda/latest/operatorguide/static-initialization.html
const cache = new NodeCache({
  stdTTL: 60,
  checkperiod: 80,
});

export interface IconikCredentials {
  appId: string;
  appAuthToken: string;
}

/**
 * Gives access to iconik credentials storage.
 * Current implementation uses SSM as storage for APP ID and APP AUTH TOKEN.
 */
export class IconikCredentialsStorage {
  private ssm = new SSM({
    maxAttempts: 5,
  });

  /**
   * Get iconik app credentials
   *
   * @returns {Promise<IconikCredentials>}
   */
  async get(): Promise<IconikCredentials> {
    if (cache.get('credentials')) {
      return cache.get('credentials') as IconikCredentials;
    }

    let result: GetParametersByPathResult;

    try {
      result = await this.ssm.getParametersByPath({
        Path: this.createParamPath(),
        WithDecryption: true,
      });
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
      }, {} as Partial<IconikCredentials>) ?? ({} as Partial<IconikCredentials>);

    if (!params.appId) {
      this.throwParamError('app-id', 'The App ID is empty');
    }

    if (!params.appAuthToken) {
      this.throwParamError('app-auth-token', 'The App Auth Token is empty');
    }

    return params as IconikCredentials;
  }

  /**
   * Update iconik app credentials
   *
   * @param {IconikCredentials} credentials
   * @returns {Promise<void>}
   */
  async update(credentials: IconikCredentials) {
    try {
      await this.ssm.putParameter({
        Name: this.createParamPath('app-id'),
        Type: 'String',
        Value: credentials.appId,
        Overwrite: true,
      });
      await this.ssm.putParameter({
        Name: this.createParamPath('app-auth-token'),
        Value: credentials.appAuthToken,
        Type: 'SecureString',
        Overwrite: true,
      });
      cache.set('credentials', credentials);
    } catch (error) {
      debug('update ssm parameters error=', error);
      throw new RuntimeError('Cannot update SSM parameters.');
    }
  }

  private throwParamError(name: string, reason: string): never {
    throw new InputValidationError(`${reason}. Please check/add ${this.createParamPath(name)} SSM parameter.`);
  }

  private createParamPath(path?: string): string {
    return `/win/${getEnv('CLIENT')}/${getEnv('SERVICE_NAME')}/${getStage()}/iconik-credentials${
      path ? `/${path}` : ''
    }`;
  }
}
