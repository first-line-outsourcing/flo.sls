import { readFileSync } from 'fs';

export function getEnvironment() {
  const json = readFileSync('./env.json').toString();
  const { common, stages } = JSON.parse(json);
  const stage = process.env.STAGE!;
  return Object.assign(common, stages[stage]);
}
