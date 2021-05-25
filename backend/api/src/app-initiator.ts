import * as helmet from 'helmet';
import * as hpp from 'hpp';
import { MethodNotAllowedException } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpMethods } from './shared/utils/constants/http-methods';

export class AppInitiator {
    private allowedMethods = [
        HttpMethods.GET,
        HttpMethods.POST,
        HttpMethods.PATCH,
        HttpMethods.DELETE,
        HttpMethods.HEAD,
        HttpMethods.OPTIONS,
    ];

    constructor(private readonly app: NestExpressApplication) {
        this.initiateMiddleware();
    }

    private initiateMiddleware() {
        // Starts listening for shutdown hooks
        this.app.enableShutdownHooks();
        this.app.enableCors();

        this.app.use(helmet());
        this.app.use(hpp());
        this.app.set('trust proxy', true);

        this.app.use((req, res, next) => {
            if (!this.allowedMethods.includes(req.method)) {
                throw new MethodNotAllowedException();
            }
            return next();
        });
    }
}
