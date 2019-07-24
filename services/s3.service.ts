import {
  DeleteObjectOutput,
  DeleteObjectRequest, GetObjectOutput,
  GetObjectRequest,
  PutObjectOutput,
  PutObjectRequest,
} from 'aws-sdk/clients/s3';
import * as S3 from 'aws-sdk/clients/s3';

export class S3Service {
  public s3 = new S3();

  public getPreSignedPutUrl(key: string, bucket: string): string {
    const params = {
      Bucket: bucket,
      Key: key,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    };
    // return this.s3.getSignedUrl('putObject', params); TODO: should be use for private bucket in the future
    return `https://s3.amazonaws.com/${bucket}/`;
  }

  public getPreSignedGetUrl(key: string, bucket: string): string {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    // return this.s3.getSignedUrl('getObject', params); TODO: should be use for private bucket in the future
    return `https://s3.amazonaws.com/${bucket}/${key}`;
  }

  public remove(key: string, bucket: string): Promise<DeleteObjectOutput> {
    const params: DeleteObjectRequest = {
      Bucket: bucket,
      Key: key,
    };
    return this.s3.deleteObject(params).promise();
  }

  public put(key: string, body: string, bucket: string): Promise<PutObjectOutput> {
    const params: PutObjectRequest = {
      ACL: 'public-read',
      Bucket: bucket,
      Key: key,
      Body: body
    };
    return this.s3.putObject(params).promise();
  }

  public get(key: string, bucket: string): Promise<GetObjectOutput> {
    const params: GetObjectRequest = {
      Bucket: bucket,
      Key: key,
    };
    return this.s3.getObject(params).promise();
  }
}
