import { Module } from '@nestjs/common';
import { QuestionsAnswersModule } from '../features/questions-answers/questions-answers.module';
import { UsersModule } from '../features/users/users.module';
import { ConfigurationModule } from '../shared/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [ConfigurationModule, UsersModule, QuestionsAnswersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
