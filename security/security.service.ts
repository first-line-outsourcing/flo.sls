import { getEnv } from '@helper/environment';
import { log } from '@helper/logger';
import { IconikTokenInterface, IconikTokenModel, IconikTokenSchema } from '@models/DynamoDB/iconik-token.model';
import { IconikService } from '@workflowwin/iconik-api';
import { CustomActionSchema } from '@workflowwin/iconik-api/dist/src/assets/assets-methods';
import { WebhookResponseSchema } from '@workflowwin/iconik-api/src/notifications/notifications-methods';
import { CloudWatchEvents, Lambda } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import {
  DescribeRuleResponse,
  PutRuleRequest,
  PutRuleResponse,
  PutTargetsRequest,
  PutTargetsResponse,
} from 'aws-sdk/clients/cloudwatchevents';
import { AddPermissionResponse } from 'aws-sdk/clients/lambda';
import { ScanResponse } from 'dynamoose/dist/DocumentRetriever';

export class SecurityService {
  private readonly cloudWatchEvents: CloudWatchEvents;
  private readonly lambda: Lambda;

  constructor() {
    this.cloudWatchEvents = new AWS.CloudWatchEvents({ apiVersion: '2015-10-07' });
    this.lambda = new AWS.Lambda();
    AWS.config.update({ region: getEnv('REGION') });
  }

  public async getCustomActions(iconikService: IconikService): Promise<CustomActionSchema[]> {
    return (await iconikService.assets.getCustomActions()).objects.filter((CA) => CA.type !== 'OPEN');
  }

  public async getWebHooks(iconikService: IconikService): Promise<WebhookResponseSchema[]> {
    return (await iconikService.notifications.getWebhooks()).objects;
  }

  public async createNewAppToken(iconikService: IconikService): Promise<string> {
    return (await iconikService.auth.createAppToken(getEnv('ICONIK_APP_ID'))).token;
  }

  public getTokensFromWHandCA(
    webHooks: WebhookResponseSchema[],
    customActions: CustomActionSchema[]
  ): IconikTokenSchema[] {
    const tokens = [...this.getTokensFromArray(customActions), ...this.getTokensFromArray(webHooks)];
    return tokens
      .filter((token, index) => tokens.indexOf(token) === index)
      .map((token) => {
        return { token };
      });
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
    await Promise.all(
      webHooks.map(async ({ event_type, url, id, status, headers }) => {
        try {
          await iconikService.notifications.updateWebhook(id, {
            url,
            event_type,
            status,
            headers: { ...headers, 'auth-token': token },
          });
        } catch (error) {
          log('updateWebhook', error);
        }
      })
    );

    await Promise.all(
      customActions.map(async (CA) => {
        try {
          const { context, id, title, url } = CA;
          await iconikService.assets.updateCustomAction(context, id!, {
            context,
            title,
            url,
            headers: { ...CA?.headers, 'auth-token': token },
          });
        } catch (error) {
          log('updateCustomAction', error);
        }
      })
    );
  }

  public async createRuleAndBindLambda(
    ruleName: string,
    ruleSchedule: number,
    lambdaARN: string
  ): Promise<PutRuleResponse | void> {
    const params: PutRuleRequest = {
      Name: ruleName,
      ScheduleExpression: `rate(${ruleSchedule} minutes)`,
      State: 'ENABLED',
    };

    const isRule = await this.getCloudWatchRule(ruleName);
    if (isRule) {
      return await this.putCloudWatchRule(params);
    }

    const { RuleArn } = await this.putCloudWatchRule(params);

    await this.addFunctionInvokePermissionForRule(`${ruleName}-permission`, lambdaARN, RuleArn!);

    await this.putCloudWatchTargets({
      Rule: ruleName,
      Targets: [
        {
          Id: '1',
          Arn: lambdaARN,
        },
      ],
    });
  }

  public async getTokensFromDynamoDB(): Promise<ScanResponse<IconikTokenInterface>> {
    return (await IconikTokenModel.scan().exec()) as ScanResponse<any>;
  }

  public isInvalidateIconikToken(dateOfCreation: Date) {
    const hourInMilliseconds = 3600000;
    const refreshTokenMilliseconds: number = parseFloat(getEnv('REFRESH_TOKEN_HOURS')) * hourInMilliseconds;

    const nowTime = new Date().getTime();
    const invalidationTime = dateOfCreation.getTime() + refreshTokenMilliseconds;

    return nowTime > invalidationTime;
  }

  public async invalidateIconikToken(iconikService: IconikService, token: string) {
    try {
      await iconikService.auth.deleteToken(getEnv('ICONIK_APP_ID'), token);
    } catch (error) {
      log('invalidateIconikToken: ', error);
    }
  }

  private async addFunctionInvokePermissionForRule(
    permissionName: string,
    lambdaARN: string,
    ruleARN: string
  ): Promise<AddPermissionResponse | undefined> {
    try {
      return await this.lambda
        .addPermission({
          Action: 'lambda:invokeFunction',
          FunctionName: lambdaARN,
          StatementId: permissionName,
          Principal: 'events.amazonaws.com',
          SourceArn: ruleARN,
        })
        .promise();
    } catch (error) {
      log('addFunctionInvokePermissionForRule: ', error);
    }
  }

  private async getCloudWatchRule(name: string): Promise<DescribeRuleResponse | undefined> {
    try {
      return await this.cloudWatchEvents.describeRule({ Name: name }).promise();
    } catch (error) {
      log('getCloudWatchRule: ', error);
    }
  }

  private async putCloudWatchRule(params: PutRuleRequest): Promise<PutRuleResponse> {
    return await this.cloudWatchEvents.putRule(params).promise();
  }

  private async putCloudWatchTargets(params: PutTargetsRequest): Promise<PutTargetsResponse> {
    return await this.cloudWatchEvents.putTargets(params).promise();
  }
}
