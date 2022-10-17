import { RuntimeError } from '@floteam/errors/runtime/runtime-error';
import { SSM } from 'aws-sdk';
import { Parameter } from 'aws-sdk/clients/ssm';

export interface ParameterInSSM {
  Name: string;
  Value: string;
}

export class SSMService {
  private ssm = new SSM();

  async loadCredentialsFromSSM(environments: string[]): Promise<SSM.GetParametersResult> {
    let result: SSM.GetParametersResult;
    try {
      result = await this.ssm
        .getParameters({
          Names: environments.map((env) => this.createParamName(env)),
        })
        .promise();
    } catch (error) {
      console.log('error', error);
      throw new RuntimeError('Cannot get SSM parameters.');
    }
    return {
      Parameters: result.Parameters?.map((parameter) => this.createNameValue(parameter)),
      InvalidParameters: result.InvalidParameters?.map((invalidParameter) =>
        invalidParameter.replace(this.createParamPath(), '')
      ),
    };
  }

  public async addCredentialToSSM({ Name, Value }: ParameterInSSM): Promise<void> {
    try {
      await this.ssm.putParameter({ Name: this.createParamName(Name), Value, Type: 'String' }).promise();
    } catch (error) {
      console.log('error', error);
      throw new RuntimeError('Cannot get SSM parameters.');
    }
  }

  public async updateCredentialInSSM(updatedEnv) {
    try {
      //TODO: Update parameter in SSM
    } catch (error) {
      console.log('error', error);
      throw new RuntimeError('Cannot update SSM parameters.');
    }
  }

  private createParamName(env: string): string {
    return `${this.createParamPath()}${env}`;
  }

  private createNameValue(parameter: Parameter): Parameter {
    return {
      Name: parameter.Name?.replace(this.createParamPath(), ''),
      Value: parameter.Value,
    };
  }

  private createParamPath(): string {
    return `/${process.env.CLIENT}/${process.env.SERVICE_NAME}/${process.env.STAGE}/`;
  }
}
