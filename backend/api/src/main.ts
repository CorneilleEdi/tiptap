import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppInitiator } from './app-initiator';
import { AppModule } from './app/app.module';
import { HttpExceptionFilter } from './shared/core/exceptions/http-exception-filter.exception';
import { BodyValidationPipe } from './shared/core/pipes/body-validation.pipe';

async function bootstrap() {
    const runningInCloud = process.env.RUNNING_ENVIRONMENT === 'cloud';

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: runningInCloud ? false : ['error', 'warn', 'verbose', 'debug'],
    });

    new AppInitiator(app);

    app.useGlobalPipes(new BodyValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());

    const PORT = process.env.PORT || 8080;

    await app.listen(PORT, () => {
        new Logger('ApiApplication').verbose(`Api start ,running and listening on port ${PORT}`);

    });
}
bootstrap();
