import { getEnv } from '@helper/environment';
import { IconikService } from '@workflowwin/iconik-api';
import { CustomActionSchema } from '@workflowwin/iconik-api/dist/src/assets/assets-methods';
import { WebhookResponseSchema } from '@workflowwin/iconik-api/src/notifications/notifications-methods';

export class SecurityService {
  constructor() {}

  public getTokensFromWHandCA(webHooks: WebhookResponseSchema[], customActions: CustomActionSchema[]): string[] {
    const tokens = [...this.getTokensFromArray(customActions), ...this.getTokensFromArray(webHooks)];
    return tokens.filter((token, index) => tokens.indexOf(token) === index);
  }

  public getTokensFromArray(array: CustomActionSchema[] | WebhookResponseSchema[]): string[] {
    const tokens: string[] = [];
    for (const { headers } of array) {
      if (headers && headers['auth-token']) {
        tokens.push(headers['auth-token']);
      }
    }
    return tokens;
  }

  public async updateTokensInWHandCA(
    iconikService: IconikService,
    webHooks: WebhookResponseSchema[],
    customActions: CustomActionSchema[],
    token: string
  ): Promise<void> {
    const WH: Promise<WebhookResponseSchema>[] = webHooks.map(({ event_type, url, id, status, headers }) =>
      iconikService.notifications.updateWebhook(id, {
        url,
        event_type,
        status,
        headers: { ...headers, 'auth-token': token },
      })
    );

    const CA: Promise<CustomActionSchema>[] = customActions.map((CA) =>
      iconikService.assets.updateCustomAction(CA.context, CA.id!, {
        ...CA,
        headers: { ...CA?.headers, 'auth-token': token },
      })
    );

    await Promise.all([WH, CA]);
  }

  public isInvalidateIconikToken(createDate: Date) {
    const hourInMilliseconds: number = 3600000;
    const refreshTokenMilliseconds: number = parseFloat(getEnv('REFRESH_TOKEN_HOURS')) * hourInMilliseconds;

    const nowTime = new Date().getTime();
    const invalidationTime = createDate.getTime() + refreshTokenMilliseconds;

    return nowTime > invalidationTime;
  }
}
