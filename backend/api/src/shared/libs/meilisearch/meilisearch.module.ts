import { ConfigurationModule } from 'src/shared/configuration';
import { Module } from '@nestjs/common';
import { GCPSecretsModule } from '../gcp/secrets';
import { meiliSearchProviders } from './meilisearch.provider';
import { MeiliSearchService } from './meilisearch.service';

@Module({
    providers: [...meiliSearchProviders, MeiliSearchService],
    exports: [MeiliSearchService],
    imports: [ConfigurationModule, GCPSecretsModule],
})
export class MeiliSearchModule {}
