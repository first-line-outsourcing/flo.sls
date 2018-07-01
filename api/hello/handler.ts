import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

export async function hello(event) {
  console.log('hello', event);
  await promisify(writeFile)('/tmp/message.txt', 'Hello Node.js');
  return promisify(readFile)('/tmp/message.txt').then((data: Buffer) => data.toString('utf8')) ;
}