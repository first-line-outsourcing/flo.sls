import { AxiosError, Method } from 'axios';

export interface ShortAxiosError {
  error: {
    status: number;
    statusText: string;
  };
  requestConfig: {
    url?: string;
    headers?: any;
    method?: Method;
    data?: any;
  };
}

export function log(...args): undefined {
  /**
   * Don't show the logs in CI for faster testing
   * Sometimes we turn off the logs in production environment for better performance
   */
  if (process.env.CI === 'true' || process.env.HIDE_LOGS === 'true') {
    return;
  }
  if (process.env.IS_OFFLINE === 'true') {
    args.forEach((i) => console.dir(i));
  } else {
    console.log(
      ...args.map((arg) => {
        /**
         * Axios error has complicated structure that doesn't allow debugging it easily
         */
        if (arg.isAxiosError) {
          return JSON.stringify(shortAxiosError(arg));
        }
        return JSON.stringify(arg);
      })
    );
  }
}

export function shortAxiosError(error: AxiosError): ShortAxiosError {
  const { config, response } = error;
  const { url, headers, method, data } = config;
  const { status, statusText } = response!;
  return {
    error: {
      status,
      statusText,
    },
    requestConfig: {
      url,
      headers,
      method,
      data,
    },
  };
}
