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
