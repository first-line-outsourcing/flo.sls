import { InputValidationError } from '@flopackages/errors';
import { AxiosError } from 'axios';

export function isAxiosError(error: unknown): error is AxiosError {
  return error instanceof Error && !!(error as any).isAxiosError;
}

function assertAxiosError(error: unknown): void | never {
  if (!isAxiosError(error)) {
    throw new InputValidationError('Error should be an instance of AxiosError');
  }
}

export function isResponseWithHttpStatus(error: AxiosError, status: number | number[]): boolean {
  assertAxiosError(error);
  if (error.response?.status) {
    if (Array.isArray(status)) {
      return status.includes(error.response!.status);
    }
    return error.response?.status === status;
  }
  return false;
}

export async function retryRequestIf<V>(
  boundFn: (...args: any) => Promise<V>,
  httpCode: number,
  times = 3
): Promise<V> {
  let attempts = times,
    result!: V,
    error: any,
    isError = false;

  while (attempts) {
    try {
      result = await boundFn();
    } catch (reqError) {
      const shouldRetry = isAxiosError(reqError) && isResponseWithHttpStatus(reqError, httpCode);

      if (shouldRetry && attempts > 1) {
        attempts--;
        continue;
      }

      isError = true;
      error = reqError;
    }

    break;
  }

  if (isError) {
    throw error;
  }

  return result;
}
