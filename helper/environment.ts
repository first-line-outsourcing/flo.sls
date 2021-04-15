import { RuntimeError } from '@errors/runtime/runtime-error';

/**
 * Extract substitutable envs, because we use webpack-dotenv plugin
 * which have these limitations https://github.com/mrsteele/dotenv-webpack#limitations
 */
const envs: Record<string, string | undefined> = {
  STAGE: process.env.STAGE,
  REGION: process.env.REGION,
  PROFILE: process.env.PROFILE,
  CLIENT: process.env.CLIENT,
  IS_OFFLINE: process.env.IS_OFFLINE,
  OFFLINE_API_BASE_URL: process.env.OFFLINE_API_BASE_URL,
  CI: process.env.CI,
  HIDE_LOGS: process.env.HIDE_LOGS,
  USERS_TABLE_NAME: process.env.USERS_TABLE_NAME,
  JOBS_TABLE_NAME: process.env.JOBS_TABLE_NAME,
};

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
  const v = envs[name] || process.env[name];

  if (required && !v) {
    throw new RuntimeError(`Missing environment variable ${name}`);
  }

  return v;
}
