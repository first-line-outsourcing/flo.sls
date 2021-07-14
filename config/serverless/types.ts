import type { AWS } from '@serverless/typescript';

export type AWSPartitial = Omit<Partial<AWS>, 'provider'> & { provider?: Partial<AWS['provider']> };
