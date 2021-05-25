import { ConfigurationModule } from 'src/shared/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { storageProviders } from './storage.provider';
import { StorageService } from './storage.service';

@Module({
    providers: [...storageProviders, StorageService],
    exports: [...storageProviders, StorageService],
    imports: [ConfigModule, ConfigurationModule],
})
export class StorageModule {}
