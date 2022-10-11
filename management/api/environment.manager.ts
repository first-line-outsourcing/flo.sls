import { getEncryptedVariables } from '@helper/environment';
import { MetadataOutputSchema, MetadataValues } from '@workflowwin/iconik-api/dist/src/metadata/metadata-methods';
import { EnvironmentService } from './environment.service';

export class EnvironmentManager {
  private readonly service = new EnvironmentService();

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
  }
}
