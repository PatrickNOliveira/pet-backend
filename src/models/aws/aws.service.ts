import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';

@Injectable()
export class AwsService {
  AWS_S3_BUCKET: string;
  s3: AWS.S3;

  constructor() {
    this.AWS_S3_BUCKET = process.env.AWS_BUCKET;
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_SECRET_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const { filename } = file;
    const fileContent = fs.readFileSync(file.path);
    return this.s3_upload(fileContent, filename, file.mimetype);
  }

  async deleteFile(url: string) {
    const key = this.extractS3ObjectKey(url);

    try {
      return await this.s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET,
          Key: key,
        })
        .promise();
    } catch (error) {
      this.handleError(error, 'Falha ao deletar arquivo');
    }
  }

  private async s3_upload(file: Buffer, name, mimetype) {
    try {
      const params = {
        Bucket: this.AWS_S3_BUCKET,
        Key: String(name),
        Body: file,
        ACL: 'public-read',
        ContentType: mimetype,
        ContentDisposition: 'inline',
      };

      return this.s3.upload(params).promise();
    } catch (error) {
      this.handleError(error, 'Erro ao enviar arquivo');
    }
  }

  private handleError(error: Error, message: string) {
    return {
      error: true,
      message: [message],
      data: error,
    };
  }

  private extractS3ObjectKey(s3Url: string) {
    const baseUrl = 'https://s3.amazonaws.com/';
    const prefix = s3Url.startsWith(baseUrl) ? baseUrl : 'https://';
    const bucketUrl = s3Url.substring(prefix.length);
    const parts = bucketUrl.split('/');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const bucket = parts.shift();
    const key = parts.join('/');
    return key;
  }
}
