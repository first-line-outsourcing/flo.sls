import type { AWS } from '@serverless/typescript';
import { all } from 'deepmerge';
import { AWSPartitial } from './types';

/**
 * Join config parts with master
 *
 * @param {AWS} master
 * @param {Partial<AWS>[]} parts
 * @returns {AWS}
 */
export function joinParts(master: AWS, parts: AWSPartitial[]): AWS {
  return all([master].concat(parts as AWS[])) as AWS;
}

export type Stage = 'dev' | 'test' | 'ua' | 'prod' | string;

/**
 * Get SLS stage name
 *
 * @returns {Stage}
 */
export function getStage(): Stage {
  const v = process.env.STAGE;

  if (v == undefined) {
    throw new ReferenceError('Missing stage variable');
  }

  return v;
}

export function isStage(stage: Stage): boolean {
  return getStage() === stage;
}
