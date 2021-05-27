import { MeiliSearch } from 'meilisearch';
import { CONFIGURATIONS } from 'src/shared/configuration';
import { SECRETS } from 'src/shared/utils/constants/secrets.constant';
import { ConfigService } from '@nestjs/config';
import { MEILISEARCH } from '../../utils/constants/providers.constant';
import { GCPSecretsModule, SecretsService } from '../gcp/secrets';

export const meiliSearchProviders = [
    {
        provide: MEILISEARCH,
        useFactory: async (
            configService: ConfigService,
            secretsService: SecretsService,
        ): Promise<MeiliSearch> => {
            const host = configService.get(CONFIGURATIONS.MEILISEARCH_HOST);
            const apiKey = await secretsService.getSecret(SECRETS.MEILISEARCH_MASTER_KEY);
            return new MeiliSearch({
                host: host,
                apiKey: apiKey,
            });
        },
        inject: [ConfigService, SecretsService],
        import: [GCPSecretsModule],
    },
];
