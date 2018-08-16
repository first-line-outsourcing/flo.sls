export function log(...args) {
  console.log.apply(console, args.map(arg => JSON.stringify(arg)));
}