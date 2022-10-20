import { RuntimeError } from '@floteam/errors/runtime/runtime-error';

export type Stage = 'local' | 'dev' | 'test' | 'prod';

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

  if (required && !v) {
    throw new RuntimeError(`Missing environment variable ${name}`);
  }

  return v;
}
