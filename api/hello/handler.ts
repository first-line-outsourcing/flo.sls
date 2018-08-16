import { readFile, writeFile } from 'fs';
import { promisify } from 'util';

export async function hello(event) {
  console.log('hello', event);

  /*const s3 = new AWS.S3({
    s3ForcePathStyle: true,
    endpoint: new AWS.Endpoint('http://localhost:8001'),
  });

  await promisify(writeFile)('/tmp/message.txt', 'Hello Node.js');
  const file = await promisify(readFile)('/tmp/message.txt');
  const params = {
    Bucket: process.env.BUCKET as string,
    Key: 'file.txt',
    Body: file
  };
  await s3.putObject(params).promise();
  log('put file');*/

  await promisify(writeFile)('/tmp/message.txt', 'Hello Node.js');
  return promisify(readFile)('/tmp/message.txt').then((data: Buffer) => data.toString('utf8')) ;
}