import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GCPSecretsModule } from '../gcp/secrets';
import { FirebaseAuthService } from './firebase-auth.service';
import { firebaseProviders } from './firebase.provider';

@Module({
    providers: [...firebaseProviders, FirebaseAuthService],
    exports: [...firebaseProviders, FirebaseAuthService],
    imports: [
        ConfigModule,
        GCPSecretsModule,
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 10,
        }),
    ],
})
export class FirebaseModule {}
