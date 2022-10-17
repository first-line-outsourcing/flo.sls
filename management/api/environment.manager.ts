import { getEncryptedVariables } from '@helper/environment';
import { ParameterInSSM, SSMService } from '@services/ssm.servise';
import { MetadataOutputSchema } from '@workflowwin/iconik-api/dist/src/metadata/metadata-methods';
import { EnvironmentVariables } from 'aws-sdk/clients/lambda';
import { EnvironmentInitService } from './environment.init.service';
import { EnvironmentService } from './environment.service';

export class EnvironmentManager {
  private readonly service = new EnvironmentService();
  private readonly ssm: SSMService = new SSMService();
  private environmentForStore = ['ICONIK_APP_ID', 'ICONIK_APP_AUTH_TOKEN'];

  async decryptVariables(): Promise<void> {
    const encryptedEnv = getEncryptedVariables();
    if (!Object.keys(encryptedEnv).length) {
      return;
    }
    const decryptedValues = await this.service.decryptVariables(encryptedEnv);
    await this.service.updateLambdaEnvironment(decryptedValues);
  }

  async updateEnvironment(metadata: MetadataOutputSchema): Promise<void> {
    const updatedEnv = this.service.parseMetadataToEnvironment(metadata);
    await this.service.updateLambdaEnvironment(updatedEnv);
    await this.ssm.updateCredentialInSSM(updatedEnv);
  }

  async getEnvironmentFromSSM() {
    const { Parameters, InvalidParameters } = await this.ssm.loadCredentialsFromSSM(this.environmentForStore);
    let projectEnvs: ParameterInSSM[] = [];
    if (InvalidParameters?.length) {
      projectEnvs = await this.service.getProjectEnvs(InvalidParameters);
      await Promise.all(projectEnvs.map((envData) => this.ssm.addCredentialToSSM(envData)));
    }
    if (Parameters?.length) {
      projectEnvs = Parameters.concat(projectEnvs) as ParameterInSSM[];
    }
    const updatedEnv: EnvironmentVariables = this.service.mapEnvsFromSSMService(projectEnvs);
    await this.service.updateLambdaEnvironment(updatedEnv);
  }

  async initialization(initService: EnvironmentInitService) {
    return initService.initialization();
  }
}
