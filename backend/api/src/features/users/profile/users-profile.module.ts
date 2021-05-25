import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../../shared/configuration';
import { FirestoreModule } from '../../../shared/libs/gcp/firestore';
import { UsersProfileRepository } from './users-profile.repository';

@Module({
    providers: [UsersProfileRepository],
    imports: [ConfigurationModule, FirestoreModule],
    exports: [UsersProfileRepository],
})
export class UsersProfileModule {}
