import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIGURATIONS, ConfigurationService } from '../../../configuration';

@Injectable()
export class SecretsService {
    private readonly client: SecretManagerServiceClient;
    private readonly projectID: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly appConfigService: ConfigurationService,
    ) {
        this.client = new SecretManagerServiceClient();
        this.projectID = this.configService.get(CONFIGURATIONS.GCLOUD_PROJECT);
    }

    getClient(): SecretManagerServiceClient {
        return this.client;
    }

    async getSecretSafe(key: string): Promise<string | null> {
        try {
            const name = `projects/${this.projectID}/secrets/${key}/versions/latest`;

            const [version] = await this.client.accessSecretVersion({
                name,
            });

            return version.payload.data.toString();
        } catch (e) {
            if (e.code && e.code === 5) {
                return null;
            } else {
                throw e;
            }
        }
    }

    async getSecret(key: string): Promise<string | null> {
        const runningInCloud = this.appConfigService.runningInCloud;

        if (!runningInCloud) {
            const value = process.env[key];
            if (!value) {
                throw new Error(`secret ${key} not found locally`);
            }
            return value;
        } else {
            try {
                const name = `projects/${this.projectID}/secrets/${key}/versions/latest`;

                const [version] = await this.client.accessSecretVersion({
                    name,
                });

                return version.payload.data.toString();
            } catch (e) {
                if (e.code && e.code === 5) {
                    throw new Error(`secret ${key} not found`);
                } else {
                    throw e;
                }
            }
        }
    }
}
