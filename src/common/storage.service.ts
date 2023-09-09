import { Injectable } from '@nestjs/common';

import { PutObjectRequest } from '@aws-sdk/client-s3';
import 'aws-sdk';
import * as AWS from 'aws-sdk';
import * as mime from 'mime-types';
import * as path from 'path';
import * as uniqid from 'uniqid';

import { ConfigurationService } from '../config/configuration.service';

@Injectable()
export class StorageService {
  private s3: AWS.S3;
  constructor(private readonly configurationService: ConfigurationService) {
    const spacesEndpoint = new AWS.Endpoint(
      `${configurationService.storage.region}.${configurationService.storage.baseUrl}`,
    );
    this.s3 = new AWS.S3({
      endpoint: spacesEndpoint.href,
      credentials: new AWS.Credentials({
        accessKeyId: this.configurationService.storage.accessKey,
        secretAccessKey: this.configurationService.storage.secretKey,
      }),
    });
  }

  async upload(file) {
    const ext = path.extname(file.originalname);
    return await new Promise((resolve, reject) => {
      const key = `${
        this.configurationService.storage.folder
      }/${uniqid()}${ext}`;
      const params = {
        Bucket: this.configurationService.storage.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: mime.lookup(ext),
        ContentLength: file.size,
        ACL: 'public-read',
      };
      const options = {
        partSize: 100 * 1024 * 1024, // 100 MB
        queueSize: 10,
      };
      this.s3.upload(params as PutObjectRequest, options, function (err, data) {
        if (!err) {
          resolve(data.Location); // successful response
        } else {
          reject(err); // an error occurred
        }
      });
    });
  }

  async save(
    files: Array<Express.Multer.File> | Express.Multer.File,
  ): Promise<Array<string>> {
    const rFiles = Array.isArray(files) ? files : [files];
    const tasks = [];
    for (let i = 0; i < rFiles.length; i++) {
      const file = rFiles[i];
      tasks.push(this.upload(file));
    }
    return await Promise.all(tasks);
  }
}
