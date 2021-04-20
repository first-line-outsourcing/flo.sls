import { HttpBadRequestError, HttpInternalServerError, HttpUnauthorizedError } from '@errors/http';
import { IconikService } from '@workflowwin/iconik-api';
import { IconikParams } from '@workflowwin/iconik-api/src/index';
import { IconikContext } from './interfaces/context';

export async function getCallerAndOwner(
  { authToken, iconikUrl, appId, systemDomainId }: IconikParams,
  callerId: string
): Promise<IconikContext> {
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
    const caller = owner.id === callerId ? owner : await iconik.users.getUserById(callerId);

    context.caller = {
      id: caller.id!,
      email: caller.email,
    };

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
