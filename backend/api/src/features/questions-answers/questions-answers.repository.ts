import { CollectionReference, Firestore } from '@google-cloud/firestore';
import { PartialDeep } from 'type-fest';
import { Inject, Injectable } from '@nestjs/common';
import { FirestoreDocumentNotFoundException } from '../../shared/libs/gcp/firestore/firestore.exception';
import { FirestoreCollections } from '../../shared/utils/constants/firestore.constant';
import { GCP_FIRESTORE } from '../../shared/utils/constants/providers.constant';
import { IAnswer, IFirestoreAnswer } from './answers/models/answer.interface';
import { AnswerMapper } from './answers/models/answer.mapper';
import { IFirestoreQuestion, IQuestion } from './questions/models/question.interface';
import { QuestionMapper } from './questions/models/question.mapper';

@Injectable()
export class QuestionsAnswersRepository {
    private readonly questionsCollection: CollectionReference;
    private readonly answersCollection: CollectionReference;
    constructor(@Inject(GCP_FIRESTORE) private readonly firestore: Firestore) {
        this.questionsCollection = this.firestore.collection(FirestoreCollections.QUESTIONS);
        this.answersCollection = this.firestore.collection(FirestoreCollections.ANSWERS);
    }
    /******************************************
     * QUESTIONS
     ******************************************/

    async getQuestion(id: string, safe = true): Promise<IQuestion> | null {
        const snapshot = await this.questionsCollection.doc(id).get();

        if (!snapshot.exists) {
            if (safe) {
                return null;
            } else {
                throw new FirestoreDocumentNotFoundException(id);
            }
        }

        return QuestionMapper.fromFirebaseDataToData({ ...snapshot.data() } as IFirestoreQuestion);
    }

    async createQuestion(userUid: string, questionUid: string, data: PartialDeep<IQuestion>) {
        await this.questionsCollection.doc(questionUid).set(
            QuestionMapper.fromDataToFirebaseData({
                uid: questionUid,
                ...data,
                userUid,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }),
        );

        return await this.getQuestion(questionUid);
    }

    async updateQuestion(questionUid: string, data: PartialDeep<IQuestion>) {
        const question = await this.getQuestion(questionUid);
        await this.questionsCollection.doc(questionUid).set({
            ...QuestionMapper.fromDataToFirebaseData({
                uid: questionUid,
                ...question,
                ...data,
                updatedAt: Date.now(),
            }),
        });

        return await this.getQuestion(questionUid);
    }

    async deleteQuestion(questionUid: string) {
        return await this.questionsCollection.doc(questionUid).delete();
    }

    /******************************************
     * ANSWERS
     ******************************************/

    async getAnswer(id: string, safe = true): Promise<IAnswer> | null {
        const snapshot = await this.answersCollection.doc(id).get();

        if (!snapshot.exists) {
            if (safe) {
                return null;
            } else {
                throw new FirestoreDocumentNotFoundException(id);
            }
        }

        return AnswerMapper.fromFirebaseDataToData({ ...snapshot.data() } as IFirestoreAnswer);
    }

    async createAnswer(
        userUid: string,
        questionUid: string,
        answerUid: string,
        data: PartialDeep<IAnswer>,
    ) {
        const question = await this.getQuestion(questionUid, false);

        await this.answersCollection.doc(answerUid).set(
            AnswerMapper.fromDataToFirebaseData({
                uid: answerUid,
                questionUid: questionUid,
                number: question.answersCount++,
                ...data,
                userUid,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }),
        );

        return await this.getAnswer(answerUid);
    }

    async updateAnswer(answerUid: string, data: PartialDeep<IAnswer>) {
        const answer = await this.getAnswer(answerUid);
        await this.answersCollection.doc(answerUid).set({
            ...AnswerMapper.fromDataToFirebaseData({
                uid: answerUid,
                ...answer,
                ...data,
                updatedAt: Date.now(),
            }),
        });

        return await this.getAnswer(answerUid);
    }

    async deleteAnswer(answerUid: string) {
        return await this.answersCollection.doc(answerUid).delete();
    }
}
