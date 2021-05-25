import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../../shared/configuration';
import { FirebaseModule } from '../../../shared/libs/firebase';
import { FirestoreModule } from '../../../shared/libs/gcp/firestore';
import { StorageModule } from '../../../shared/libs/gcp/storage';
import { UsersProfileController } from './users-profile.controller';
import { UsersProfileRepository } from './users-profile.repository';
import { UsersProfileService } from './users-profile.service';

@Module({
    controllers: [UsersProfileController],
    providers: [UsersProfileRepository, UsersProfileService],
    imports: [ConfigurationModule, FirebaseModule, FirestoreModule, StorageModule],
    exports: [UsersProfileRepository],
})
export class UsersProfileModule {}
