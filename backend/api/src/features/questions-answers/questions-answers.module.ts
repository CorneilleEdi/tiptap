import { ConfigurationModule } from 'src/shared/configuration';
import { FirestoreModule } from 'src/shared/libs/gcp/firestore';
import { Module } from '@nestjs/common';
import { QuestionsAnswersRepository } from './questions-answers.repository';

@Module({
    providers: [QuestionsAnswersRepository],
    imports: [ConfigurationModule, FirestoreModule],
    exports: [QuestionsAnswersRepository],
})
export class QuestionsAnswersModule {}
