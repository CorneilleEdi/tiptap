import * as admin from 'firebase-admin';
import { FIREBASE_AUTH } from '../../utils/constants/providers.constant';
import { SECRETS } from '../../utils/constants/secrets.constant';
import { GCPSecretsModule, SecretsService } from '../gcp/secrets';

export const firebaseProviders = [
    {
        provide: FIREBASE_AUTH,
        useFactory: async (secretsService: SecretsService): Promise<admin.auth.Auth> => {
            const [cred, url] = await Promise.all([
                secretsService.getSecret(SECRETS.FIREBASE_CREDENTIALS),
                secretsService.getSecret(SECRETS.FIREBASE_DATABASE_URL),
            ]);
            admin.initializeApp({
                credential: admin.credential.cert(JSON.parse(`${cred}`)),
                databaseURL: url,
            });

            return admin.auth();
        },
        inject: [SecretsService],
        import: [GCPSecretsModule],
    },
];
