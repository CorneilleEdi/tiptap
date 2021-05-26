import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { QuestionsAnswersModule } from '../../../features/questions-answers/questions-answers.module';
import { ConfigurationModule } from '../../../shared/configuration';
import { FirebaseModule } from '../../../shared/libs/firebase';
import { StorageModule } from '../../../shared/libs/gcp/storage';
import { UsersProfileModule } from '../profile/users-profile.module';
import { UsersAnswersController } from './answers/users-answers.controller';
import { UsersAnswersService } from './answers/users-answers.service';
import { UsersQuestionsController } from './questions/users-questions.controller';
import { UsersQuestionsService } from './questions/users-questions.service';

@Module({
    controllers: [UsersQuestionsController, UsersAnswersController],
    providers: [UsersQuestionsService, UsersAnswersService],
    imports: [
        NestjsFormDataModule,
        ConfigurationModule,
        FirebaseModule,
        StorageModule,
        UsersProfileModule,
        QuestionsAnswersModule,
    ],
})
export class UsersQuestionsAnswersModule { }
