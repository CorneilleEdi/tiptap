import { FirebaseModule } from 'src/shared/libs/firebase';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../../shared/configuration';
import { FirestoreModule } from '../../../shared/libs/gcp/firestore';
import { UsersProfileModule } from '../profile/users-profile.module';
import { UsersAuthenticationController } from './users-authentication.controller';
import { UsersAuthenticationService } from './users-authentication.service';

@Module({
    controllers: [UsersAuthenticationController],
    providers: [UsersAuthenticationService],
    imports: [ConfigurationModule, FirebaseModule, FirestoreModule, UsersProfileModule],
})
export class UsersAuthenticationModule {}
