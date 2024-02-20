import { RuntimeError } from '@flopackages/errors';

export type Stage = 'local' | 'dev' | 'test' | 'prod' | string;

export function getStage(): Stage {
  return getEnv('STAGE') as Stage;
}

export function isStage(stage: Stage): boolean {
  return getStage() === stage;
}

export function getEnv(name: string, required?: true): string;
export function getEnv(name: string, required: false): string | undefined;
export function getEnv(name: string, required = true): string | undefined {
  const v = process.env[name];

  if (required && v == undefined) {
    throw new RuntimeError(`Missing environment variable ${name}`);
  }

  return v;
}
