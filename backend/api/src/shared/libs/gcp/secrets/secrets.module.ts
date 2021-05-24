import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from '../../../configuration';
import { SecretsService } from './secrets.service';

@Module({
    providers: [SecretsService],
    exports: [SecretsService],
    imports: [ConfigModule, ConfigurationModule],
})
export class GCPSecretsModule {
}