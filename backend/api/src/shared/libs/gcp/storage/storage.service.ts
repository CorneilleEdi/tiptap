import { Storage } from '@google-cloud/storage';
import * as stream from 'stream';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ERROR_MESSAGE } from '../../../utils/constants/error-message';
import { GCP_STORAGE } from '../../../utils/constants/providers.constant';

@Injectable()
export class StorageService {
    private readonly logger: Logger = new Logger(this.constructor.name);

    constructor(@Inject(GCP_STORAGE) private storage: Storage) {}

    async deleteFileWithLink(link: string): Promise<void> {
        try {
            // link : https://storage.googleapis.com/bucket_name/xxx/xxxxxxx/xxxxxxxxxxxxxxxxxxxxx.png

            // Create an URL object
            const url = new URL(link);

            // Get pathname (everything after the base URL https://storage.googleapis.com/ )
            const pathname = url.pathname;

            // Split by "/" and remove every empty string
            const paths = pathname.split('/').filter((x) => x);

            // Get the bucket as the first element of the array
            const bucket = paths[0];

            // Combine the rest after removing the first (bucket name);
            const fileName = paths.filter((x) => paths.indexOf(x)).join('/');

            // Deletes the file from the bucket
            await this.storage.bucket(bucket).file(fileName).delete();
        } catch (error) {
            this.logger.error(ERROR_MESSAGE.DELETE_IMAGE_ERROR, error);
            throw error;
        }
    }

    async uploadMultipleFilesBuffer({
        bucketName,
        folderName,
        buffers,
        name,
        extension,
    }: {
        bucketName: string;
        folderName?: string;
        buffers: Buffer[];
        name: string;
        extension: string;
    }) {
        const promises = [];

        for (const bufferImage of buffers) {
            const fileName = name + `${extension}`;

            const blob = (await folderName)
                ? this.storage.bucket(bucketName).file(`${folderName}/${fileName}`)
                : this.storage.bucket(bucketName).file(`${fileName}`);

            promises.push(
                new Promise((resolve, reject) => {
                    const dataStream = new stream.PassThrough();
                    dataStream.push(bufferImage);
                    dataStream.push(null);
                    dataStream
                        .pipe(
                            blob.createWriteStream({
                                resumable: false,
                                validation: false,
                                public: true,
                                predefinedAcl: 'publicRead',
                                gzip: true,
                                metadata: { 'Cache-Control': 'public, max-age=31536000' },
                            }),
                        )
                        .on('error', (error: any) => {
                            dataStream.end();
                            if (error.code && error.code === 404) {
                                this.logger.error(`Bucket ${bucketName} not found`);
                            }
                            return reject(error);
                        })
                        .on('finish', () => {
                            const publicUrl = folderName
                                ? `https://storage.googleapis.com/${bucketName}/${folderName}/${fileName}`
                                : `https://storage.googleapis.com/${bucketName}/${fileName}`;

                            return resolve(publicUrl);
                        });
                }),
            );
        }
        // @ts-ignore
        return Promise.all(promises);
    }
}
