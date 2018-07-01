export function log(...args) {
  // if (process.env.IS_OFFLINE) {
  //   return;
  // }
  console.log.apply(console, args);
}