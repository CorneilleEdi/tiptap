import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIGURATIONS } from '../shared/configuration';
import { asServiceResponse } from '../shared/core/middlewares/responses.middleware';

@Injectable()
export class AppService {
    constructor(private configService: ConfigService) {}
    getHello() {
        const response = {
            message: 'Welcome on TipTap API',
            version: this.configService.get(CONFIGURATIONS.APP_VERSION),
            environment: this.configService.get(CONFIGURATIONS.ENV),
            stage: this.configService.get(CONFIGURATIONS.STAGE),
        };

        return asServiceResponse(HttpStatus.OK, 'Welcome on TipTap API', response);
    }
}
