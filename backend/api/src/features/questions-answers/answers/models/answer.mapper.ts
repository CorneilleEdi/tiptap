import { Timestamp } from '@google-cloud/firestore';
import { PartialDeep } from 'type-fest';
import { IAnswer, IFirestoreAnswer } from './answer.interface';

export class AnswerMapper {
    static fromFirebaseDataToData(data: IFirestoreAnswer): IAnswer {
        return {
            uid: data.uid,
            userUid: data.userUid,
            questionUid: data.questionUid,
            content: data.content,
            number: data.number,
            safe: data.safe,
            contentSentimentScore: data.contentSentimentScore,
            createdAt: data.createdAt ? data.createdAt.toMillis() : '',
            updatedAt: data.updatedAt ? data.updatedAt.toMillis() : '',
        };
    }

    static fromDataToFirebaseData(data: PartialDeep<IAnswer>): IFirestoreAnswer {
        return {
            uid: data.uid,
            userUid: data.userUid,
            questionUid: data.questionUid,
            content: data.content,
            number: data.number,
            safe: data.safe || true,
            contentSentimentScore: data.contentSentimentScore || 0.0,
            createdAt: data.createdAt ? Timestamp.fromMillis(data.createdAt! as number) : null,
            updatedAt: data.updatedAt ? Timestamp.fromMillis(data.updatedAt! as number) : null,
        };
    }
}
