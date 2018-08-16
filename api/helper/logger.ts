export function log(...args) {
  console.log.apply(console, JSON.stringify(args));
}