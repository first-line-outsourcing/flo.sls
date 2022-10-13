import { log } from '@helper/logger';
import { ParameterInSSM } from '@services/ssm.servise';
import { MetadataOutputSchema } from '@workflowwin/iconik-api/dist/src/metadata/metadata-methods';
import { StackResourceSummary } from 'aws-sdk/clients/cloudformation';
import { DecryptRequest } from 'aws-sdk/clients/kms';
import { KMS, Lambda, CloudFormation, SSM } from 'aws-sdk';
import { EnvironmentVariables, UpdateFunctionConfigurationRequest } from 'aws-sdk/clients/lambda';

export class EnvironmentService {
  private readonly kms = new KMS();
  private readonly lambda = new Lambda({ apiVersion: '2015-03-31' });
  private readonly cloudFormation = new CloudFormation();

  async decryptVariables(env: Record<string, string | undefined>): Promise<EnvironmentVariables> {
    const decryptedEnv: EnvironmentVariables = {};
    await Promise.all(
      Object.keys(env).map(async (key) => {
        const decryptResponse = await this.#decrypt(env[key]!);
        console.log(decryptResponse);
        decryptedEnv[key] = decryptResponse;
      })
    );
    return decryptedEnv;
  }

  parseMetadataToEnvironment(metadata: MetadataOutputSchema): EnvironmentVariables {
    const metadataValues = metadata.metadata_values;
    const defaultFieldsMapping = {
      win_IconikAppID: 'ICONIK_APP_ID',
      win_IconikAppToken: 'ICONIK_APP_AUTH_TOKEN',
    };
    const env: EnvironmentVariables = {};
    for (const field in metadataValues) {
      env[defaultFieldsMapping[field]] = metadataValues[field].field_values[0].value;
    }
    return env;
  }

  async updateLambdaEnvironment(envs: EnvironmentVariables): Promise<void> {
    const lambdasNames = await this.#getLambdaNamesFromStack();
    for (const lambdaName of lambdasNames) {
      const config = await this.#getUpdateLambdaConfig(lambdaName, envs);
      await this.lambda.updateFunctionConfiguration(config).promise();
    }
  }

  async #decrypt(encrypted: string): Promise<string> {
    const toDecrypt = encrypted.replace(/^encrypted:/, '');
    const buffer = Buffer.from(toDecrypt, 'base64');
    const decryptRequest: DecryptRequest = {
      CiphertextBlob: buffer,
      KeyId: process.env.KMS_ALIAS,
    };
    const resp = await this.kms.decrypt(decryptRequest).promise();
    log(resp);
    return resp.Plaintext!.toString('utf-8');
  }

  async #getLambdaNamesFromStack(): Promise<string[]> {
    const response = await this.cloudFormation
      .listStackResources({ StackName: process.env.CLOUD_FORMATION_STACK! })
      .promise();
    const lambdas = response.StackResourceSummaries!.filter(
      (summary: StackResourceSummary) => summary.ResourceType === 'AWS::Lambda::Function'
    );
    return lambdas.map((lambda: StackResourceSummary) => lambda.PhysicalResourceId!);
  }

  async #getUpdateLambdaConfig(
    funcName: string,
    envs: EnvironmentVariables
  ): Promise<UpdateFunctionConfigurationRequest> {
    const baseConfig = { FunctionName: funcName };
    const lambdaConfig = await this.lambda.getFunctionConfiguration(baseConfig).promise();
    return {
      ...baseConfig,
      Environment: {
        Variables: {
          ...lambdaConfig.Environment?.Variables,
          ...envs,
        },
      },
    };
  }

  async getProjectEnvs(InvalidParameters): Promise<ParameterInSSM[]> {
    const result: ParameterInSSM[] = [];
    const encryptedRegex = new RegExp('^encrypted:');
    await Promise.all(
      InvalidParameters.map(async (invalidParameter) => {
        let env = process.env[invalidParameter];
        if (env && encryptedRegex.test(env)) {
          env = env.replace(encryptedRegex, '');
          const decryptResponse = await this.#decrypt(env);
          result.push({
            Name: invalidParameter,
            Value: decryptResponse,
          });
        } else {
          result.push({
            Name: invalidParameter,
            Value: env!,
          });
        }
      })
    );
    return result;
  }

  mapEnvsFromSSMService(projectEnvs: ParameterInSSM[]): EnvironmentVariables {
    const updatedEnv: EnvironmentVariables = {};
    projectEnvs.map((envData) => (updatedEnv[envData.Name] = envData.Value));
    return updatedEnv;
  }
}
