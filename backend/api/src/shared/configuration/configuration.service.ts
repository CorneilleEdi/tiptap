import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIGURATIONS } from './configuration';

@Injectable()
export class ConfigurationService {
    constructor(private configService: ConfigService) {}

    get appName(): string {
        return this.configService.get(CONFIGURATIONS.APP_NAME);
    }

    get isProduction(): boolean {
        return this.configService.get(CONFIGURATIONS.STAGE) === 'production';
    }
    get isLocal(): boolean {
        return this.configService.get(CONFIGURATIONS.STAGE) === 'local';
    }

    get runningEnvironment(): string {
        return this.configService.get(CONFIGURATIONS.ENV);
    }
    get runningInCloud(): boolean {
        return this.configService.get(CONFIGURATIONS.ENV) === 'cloud';
    }
}
