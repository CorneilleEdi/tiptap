import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurations, configurationsValidationSchema } from './configuration';
import { ConfigurationService } from './configuration.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configurations],
            validationSchema: configurationsValidationSchema,
        }),
    ],
    controllers: [],
    providers: [ConfigService, ConfigurationService],
    exports: [ConfigService, ConfigurationService],
})
export class ConfigurationModule { }
