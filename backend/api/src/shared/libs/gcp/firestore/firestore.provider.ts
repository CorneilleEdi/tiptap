import { Firestore } from '@google-cloud/firestore';
import { ConfigService } from '@nestjs/config';
import { GCP_FIRESTORE } from '../../../utils/constants/providers.constant';

export const firestoreProviders = [
    {
        provide: GCP_FIRESTORE,
        useFactory: (configService: ConfigService): Firestore => {
            return new Firestore();
        },
        inject: [ConfigService],
    },
];
