import { AwsCfGetAtt, AwsCfJoin, AwsCfRef, AwsCfSub } from '@serverless/typescript';

export function GetAtt(path: string): AwsCfGetAtt {
  return {
    'Fn::GetAtt': path.split('.'),
  };
}

export function Join(delimiter: string, parts: unknown[]): AwsCfJoin {
  return {
    'Fn::Join': [delimiter, parts],
  };
}

export function Ref(ref: string): AwsCfRef {
  return {
    Ref: ref,
  };
}

export function Sub(str: string, vars?: Record<string, unknown>): AwsCfSub {
  return {
    'Fn::Sub': vars ? [str, vars] : str,
  };
}
