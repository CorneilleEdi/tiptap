import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { GCP_STORAGE } from '../../../utils/constants/providers.constant';

export const storageProviders = [
    {
        provide: GCP_STORAGE,
        useFactory: (configService: ConfigService): Storage => {
            return new Storage();
        },
        inject: [ConfigService],
    },
];
