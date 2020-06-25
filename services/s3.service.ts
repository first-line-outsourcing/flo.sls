import { S3 } from 'aws-sdk';
import {
  DeleteObjectOutput,
  DeleteObjectRequest,
  GetObjectOutput,
  GetObjectRequest,
  PutObjectOutput,
  PutObjectRequest,
} from 'aws-sdk/clients/s3';

export class S3Service {
  public s3 = new S3();

  public getPreSignedPutUrl(key: string, bucket: string): string {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    return this.s3.getSignedUrl('putObject', params);
  }

  public getPreSignedGetUrl(key: string, bucket: string): string {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    return this.s3.getSignedUrl('getObject', params);
  }

  public remove(key: string, bucket: string): Promise<DeleteObjectOutput> {
    const params: DeleteObjectRequest = {
      Bucket: bucket,
      Key: key,
    };
    return this.s3.deleteObject(params).promise();
  }

  public put(key: string, body: string, bucket: string, acl = 'public-read'): Promise<PutObjectOutput> {
    const params: PutObjectRequest = {
      ACL: acl,
      Bucket: bucket,
      Key: key,
      Body: body,
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
