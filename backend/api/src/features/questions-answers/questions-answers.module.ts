import { NestjsFormDataModule } from 'nestjs-form-data';
import { FirebaseModule } from 'src/shared/libs/firebase';
import { StorageModule } from 'src/shared/libs/gcp/storage';
import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../../shared/configuration';
import { FirestoreModule } from '../../shared/libs/gcp/firestore';
import { UsersProfileModule } from '../users/profile/users-profile.module';
import { AnswersController } from './answers/answers.controller';
import { AnswersService } from './answers/answers.service';
import { QuestionsAnswersRepository } from './questions-answers.repository';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';

@Module({
    controllers: [QuestionsController, AnswersController],
    providers: [QuestionsAnswersRepository, QuestionsService, AnswersService],
    imports: [
        NestjsFormDataModule,
        ConfigurationModule,
        FirestoreModule,
        FirebaseModule,
        StorageModule,
        UsersProfileModule,
    ],
    exports: [QuestionsAnswersRepository],
})
export class QuestionsAnswersModule {}
