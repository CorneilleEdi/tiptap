import { CollectionReference, FieldValue, Firestore } from '@google-cloud/firestore';
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

    async deleteAllQuestions() {
        const documents = await this.questionsCollection.get();

        const ops = [];

        documents.docs.map((doc) => ops.push(doc.ref.delete()));

        return Promise.all(ops);
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
        await this.firestore.runTransaction(async (t) => {
            const questionRef = this.questionsCollection.doc(questionUid);
            const snapshot = await t.get(questionRef);

            if (!snapshot.exists) throw new FirestoreDocumentNotFoundException(questionUid);

            const question = QuestionMapper.fromFirebaseDataToData({
                ...snapshot.data(),
            } as IFirestoreQuestion);

            t.set(
                this.answersCollection.doc(answerUid),
                AnswerMapper.fromDataToFirebaseData({
                    uid: answerUid,
                    questionUid: questionUid,
                    number: question.answersCount + 1,
                    ...data,
                    userUid,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                }),
            );
            t.update(questionRef, { answers: FieldValue.arrayUnion(answerUid) });
        });

        return await this.getAnswer(answerUid);
    }

    async updateAnswer(answerUid: string, data: PartialDeep<IAnswer>) {
        await this.firestore.runTransaction(async (t) => {
            const answerRef = this.answersCollection.doc(answerUid);
            const snapshot = await t.get(answerRef);

            if (!snapshot.exists) throw new FirestoreDocumentNotFoundException(answerUid);

            const answer = AnswerMapper.fromFirebaseDataToData({
                ...snapshot.data(),
            } as IFirestoreAnswer);

            t.update(answerRef, {
                ...AnswerMapper.fromDataToFirebaseData({
                    uid: answerUid,
                    ...answer,
                    ...data,
                    updatedAt: Date.now(),
                }),
            });
        });

        return await this.getAnswer(answerUid);
    }

    async deleteAnswer(questionUid: string, answerUid: string) {
        return await this.firestore.runTransaction(async (t) => {
            const questionRef = this.questionsCollection.doc(questionUid);
            const answerRef = this.answersCollection.doc(answerUid);

            const snapshot = await t.get(answerRef);

            if (!snapshot.exists) throw new FirestoreDocumentNotFoundException(answerUid);

            const answer = AnswerMapper.fromFirebaseDataToData({
                ...snapshot.data(),
            } as IFirestoreAnswer);

            t.delete(answerRef);
            t.update(questionRef, { answers: FieldValue.arrayRemove(answerUid) });

            return answer;
        });
    }
}
