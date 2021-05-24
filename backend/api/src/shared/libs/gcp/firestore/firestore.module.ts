import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from 'src/shared/configuration';
import { firestoreProviders } from './firestore.provider';
import { FirestoreService } from './firestore.service';

@Module({
    providers: [...firestoreProviders, FirestoreService],
    exports: [...firestoreProviders, FirestoreService],
    imports: [ConfigModule, ConfigurationModule],
})
export class StorageModule { }
