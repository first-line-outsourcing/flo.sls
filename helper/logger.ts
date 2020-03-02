export function log(...args) {
  if (process.env.CI === 'true') {
    return;
  }
  if (process.env.IS_OFFLINE === 'true') {
    args.map(i => console.dir(i));
  } else {
    console.log.apply(
      console,
      args.map(arg => JSON.stringify(arg))
    );
  }
}
