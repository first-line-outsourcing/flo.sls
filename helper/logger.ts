/**
 * Usage notes:
 *
 * 1. It is preferred to use tags for services, modules or other low level "bricks".
 *
 * ```
 * const logger = createLogger({
 *   tags: ['service', 'my-service'],
 * });
 *
 * export class MyService {
 *   doJob() {
 *     logger.info('doing job');
 *   }
 * }
 * ```
 * All logs will be tagged with 'service' and 'my-service'
 * so that we can identify the origin of the log record or
 * query logs using tags.
 *
 * 2. Before using logs read: https://lambdalog.dev/docs/v3/troubleshooting
 *
 * 3. Pass objects to the second argument:
 *
 * Don`t:
 * ```
 * logger.debug(`my object=${JSON.stringify(myObject)}`);
 * ```
 *
 * Do:
 * ```
 * logger.debug('my object', { myObject });
 * ```
 *
 * 4. Log function structure:
 *
 * logger.<level>(message_string, [custom_metadata_or_objects], [tags_array]);
 */
import { format } from '@redtea/format-axios-error';
import { isAxiosError } from './axios';
import { getEnv, isStage } from './environment';
import { LambdaLog, LambdaLogOptions } from 'lambda-log';
import { all } from 'deepmerge';

const replacer = (key: string, value: any): any => {
  if (value instanceof Set) {
    return Array.from(value.values());
  } else if (value instanceof Map) {
    return Array.from(value.entries());
  } else if (value instanceof RegExp) {
    return value.toString();
  } else if (isAxiosError(value)) {
    return format(value);
  }
  return value;
};

// default logger configuration
const defaults: LambdaLogOptions = {
  debug: isStage('dev') || isStage('test'),
  meta: {
    _version: process.env.VERSION,
  },
  replacer,
  silent: getEnv('CI', false) === 'true' || getEnv('HIDE_LOGS', false) === 'true',
};

/**
 * Create a logger instance
 *
 * @param {LambdaLogOptions} options
 * @param {boolean} useDefaults
 * @returns {LambdaLog}
 */
export function createLogger(options?: LambdaLogOptions, useDefaults = true): LambdaLog {
  options = useDefaults ? all([defaults, options].filter((_) => _) as object[]) : options;
  return new LambdaLog(options);
}

// Default global logger
export const logger = createLogger();
