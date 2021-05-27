import { Timestamp } from '@google-cloud/firestore';
import { PartialDeep } from 'type-fest';
import { ICachedQuestion, IFirestoreQuestion, IQuestion } from './question.interface';

export class QuestionMapper {
    static fromFirebaseDataToData(data: IFirestoreQuestion): IQuestion {
        return {
            uid: data.uid,
            title: data.title,
            content: data.content,
            image: data.image,
            userUid: data.userUid,
            topics: data.topics,
            answers: data.answers,
            answersCount: data.answers.length,
            safe: data.safe,
            questionSentimentScore: data.questionSentimentScore,
            createdAt: data.createdAt ? data.createdAt.toMillis() : '',
            updatedAt: data.updatedAt ? data.updatedAt.toMillis() : '',
            imageSafetyScores: {
                adult: data.imageSafetyScores.adult,
                violence: data.imageSafetyScores.violence,
                racy: data.imageSafetyScores?.racy || 0,
            },
        };
    }

    static fromDataToFirebaseData(data: PartialDeep<IQuestion>): IFirestoreQuestion {
        return {
            uid: data.uid,
            title: data.title || '',
            content: data.content || '',
            image: data.image || '',
            userUid: data.userUid,
            topics: data.topics || [],
            answers: data.answers || [],
            safe: data.safe || true,
            questionSentimentScore: data.questionSentimentScore || 0.0,
            createdAt: data.createdAt ? Timestamp.fromMillis(data.createdAt! as number) : null,
            updatedAt: data.updatedAt ? Timestamp.fromMillis(data.updatedAt! as number) : null,
            imageSafetyScores: {
                adult: data.imageSafetyScores?.adult || 0,
                violence: data.imageSafetyScores?.violence || 0,
                racy: data.imageSafetyScores?.racy || 0,
            },
        };
    }
    static fromDataToCachedData(data: IQuestion): ICachedQuestion {
        return {
            uid: data.uid,
            title: data.title,
            content: data.content,
            topics: data.topics.join(','),
        };
    }
}
