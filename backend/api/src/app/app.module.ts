import { UsersQuestionsAnswersModule } from 'src/features/users/questions-answers/users-questions-answers.module';
import { Module } from '@nestjs/common';
import { UsersModule } from '../features/users/users.module';
import { ConfigurationModule } from '../shared/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [ConfigurationModule, UsersModule, UsersQuestionsAnswersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
