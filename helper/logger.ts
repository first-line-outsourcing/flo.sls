import { AxiosError } from 'axios';

export function log(...args) {
  /**
   * Don't show the logs in CI for faster testing
   * Sometimes we turn off the logs in production environment for better performance
   */
  if (process.env.CI === 'true' || process.env.HIDE_LOGS === 'true') {
    return;
  }
  if (process.env.IS_OFFLINE === 'true') {
    args.map((i) => console.dir(i));
  } else {
    console.log.apply(
      console,
      args.map((arg) => {
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

export function shortAxiosError(error: AxiosError) {
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
