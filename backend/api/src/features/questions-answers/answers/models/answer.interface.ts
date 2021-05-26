import { Timestamp } from '@google-cloud/firestore';

export interface IFirestoreAnswer {
    // DocumentID
    uid: string;
    userUid: string;
    questionUid: string;
    number: number;
    content: string;
    safe: boolean;
    contentSentimentScore: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface IAnswer {
    // DocumentID
    uid: string;
    userUid: string;
    questionUid: string;
    number: number;
    content: string;
    safe: boolean;
    contentSentimentScore: number;
    createdAt: number | string;
    updatedAt: number | string;
}
