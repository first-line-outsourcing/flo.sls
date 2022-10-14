import { RuntimeError } from '@floteam/errors/runtime/runtime-error';
const cp = require('child_process');
const path = require('path');

export type Stage = 'local' | 'dev' | 'test' | 'prod';

export function getStage(): Stage {
  return getEnv('STAGE') as Stage;
}

export function isStage(stage: Stage): boolean {
  return getStage() === stage;
}

export function getEncryptedVariables() {
  const encryptedRegex = new RegExp('^encrypted:');
  return Object.keys(process.env).reduce((acc, key) => {
    const value = process.env[key];
    if (!value) {
      return acc;
    }
    const isEncrypted = encryptedRegex.test(value!);
    if (!isEncrypted) {
      return acc;
    }
    acc[key] = value.replace(encryptedRegex, '');
    return acc;
  }, {} as Record<string, string | undefined>);
}

export function getEnvs(stage) {
  try {
    const stdout = cp.execFileSync(
      'node',
      [path.join(process.cwd(), 'node_modules/.bin/sls')].concat(['env', '--stage', stage, '-d']),
      {
        env: {
          ...process.env,
          STAGE: stage,
          NO_GET_ENVS_SCRIPT: true,
        },
      }
    );
    const output = stdout.toString();
    return parseEnvs(output);
  } catch (error) {
    console.error(error);
    throw new Error('Unable to get credentials');
  }
}

function parseEnvs(str) {
  const lines = str.split(/\r\n|\r|\n/).slice(1);
  const output = lines.reduce((out, line) => {
    const result = line.match(/^Serverless: {3}([^:]+): (.+?)( \(encrypted\))?$/);
    if (result) {
      const [, key, value] = result;
      out[key] = value;
    }
    return out;
  }, {});
  return output;
}

export function getEnv(name: string, required?: true): string;
export function getEnv(name: string, required: false): string | undefined;
export function getEnv(name: string, required = true): string | undefined {
  const v = process.env[name];

  if (required && !v) {
    throw new RuntimeError(`Missing environment variable ${name}`);
  }

  return v;
}
