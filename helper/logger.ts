export function log(...args) {
  if (process.env.CI === 'true') {
    return;
  }
  if (process.env.IS_OFFLINE === 'true') {
    args.map((i) => console.dir(i));
  } else {
    console.log.apply(
      console,
      args.map((arg) => {
        if (arg.isAxiosError) {
          return JSON.stringify(shortAxiosError(arg));
        }
        return JSON.stringify(arg);
      })
    );
  }
}

function shortAxiosError(error) {
  const { config, response } = error;
  const { url, headers, method, data } = config;
  const { status, statusText } = response;
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
