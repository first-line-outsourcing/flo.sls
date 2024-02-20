import { IconikCredentialsStorage } from '@services/IconikCredentialsStorage';
import { IconikService } from '@workflowwin/iconik-api';
import { AxiosError } from 'axios';
import { getEnv } from '../../environment';
import { debug, log } from '../../logger';
import { HttpBadRequestError, HttpInternalServerError, HttpUnauthorizedError } from '@flopackages/errors';

/**
 * Information about who calls an API method from iconik side
 */
export interface IconikContext {
  appId: string;
  systemDomainId: string;
  caller?: {
    id: string;
    email: string;
  };
  appOwner: {
    id: string;
    email: string;
  };
  authToken: string;
  iconikUrl: string;
}

export async function authorizeIconikRequest(
  authToken: string,
  systemDomainId: string,
  callerId: string | null
): Promise<IconikContext> {
  const iconikCredentialsStore = new IconikCredentialsStorage();
  const credentials = await iconikCredentialsStore.get();

  const iconikUrl = getEnv('ICONIK_URL');
  const requiredIconikDomainId = getEnv('ICONIK_DOMAIN_ID');
  const appId = credentials.appId;

  if (!authToken) {
    log('No auth token');
    throw new HttpUnauthorizedError('No auth token');
  }

  if (requiredIconikDomainId !== systemDomainId) {
    log('Wrong domain id');
    throw new HttpUnauthorizedError('Wrong domain id');
  }

  const iconik = new IconikService({
    authToken,
    iconikUrl,
    appId,
    systemDomainId,
  });

  const context: Partial<IconikContext> = {
    appId,
    authToken,
    iconikUrl,
    systemDomainId,
  };

  try {
    const owner = await iconik.users.getUserInfo();

    if (callerId) {
      const caller = owner.id === callerId ? owner : await iconik.users.getUserById(callerId);

      context.caller = {
        id: caller.id!,
        email: caller.email,
      };
    }

    context.appOwner = {
      id: owner.id!,
      email: owner.email,
    };
  } catch (error) {
    console.log(error);

    if (error.isAxiosError) {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          throw new HttpUnauthorizedError();
        }

        throw new HttpBadRequestError(`Iconik response with "${status}: ${error.response.statusText}"`);
      }
    }

    throw new HttpInternalServerError();
  }

  return context as IconikContext;
}

export async function authorizeByAuthToken(authToken: string): Promise<IconikContext> {
  const iconikCredentialsStore = new IconikCredentialsStorage();
  const credentials = await iconikCredentialsStore.get();

  const iconikUrl = getEnv('ICONIK_URL');
  const systemDomainId = getEnv('ICONIK_DOMAIN_ID');
  const appId = credentials.appId;

  const iconik = new IconikService({
    authToken,
    iconikUrl,
    appId,
    systemDomainId,
  });

  const context: Partial<IconikContext> = {
    appId,
    authToken,
    iconikUrl,
    systemDomainId,
  };

  try {
    const caller = await iconik.users.getUserInfo();

    context.caller = {
      id: caller.id!,
      email: caller.email,
    };
  } catch (error) {
    debug(error);

    const axiosError = error as AxiosError;

    if (axiosError.isAxiosError) {
      if (axiosError.response) {
        const status = axiosError.response.status;

        if (status === 401) {
          throw new HttpUnauthorizedError();
        }

        throw new HttpBadRequestError(`Iconik response with "${status}: ${axiosError.response.statusText}"`);
      }
    }

    throw new HttpInternalServerError();
  }

  return context as IconikContext;
}
