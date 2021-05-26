import { Timestamp } from '@google-cloud/firestore';

export interface IFirestoreQuestionImageSafetyScores {
    adult: number;
    violence: number;
    racy: number;
}

export interface IFirestoreQuestion {
    // DocumentID
    uid: string;
    title: string;
    content: string;
    image: string;
    userUid: string;
    topics: string[];
    safe: boolean;
    questionSentimentScore: number;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    imageSafetyScores: IFirestoreQuestionImageSafetyScores;
    answers: string[];
}

export interface IQuestionImageSafetyScores {
    adult: number;
    violence: number;
    racy: number;
}

export interface IQuestion {
    // DocumentID
    uid: string;
    title: string;
    content: string;
    image: string;
    userUid: string;
    topics: string[];
    safe: boolean;
    questionSentimentScore: number;
    createdAt: number | string;
    updatedAt: number | string;
    imageSafetyScores: IQuestionImageSafetyScores;
    answers: string[];
    answersCount: number;
}
