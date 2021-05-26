import { CollectionReference, FieldValue, Firestore } from '@google-cloud/firestore';
import { PartialDeep } from 'type-fest';
import { Inject, Injectable } from '@nestjs/common';
import { FirestoreDocumentNotFoundException } from '../../shared/libs/gcp/firestore/firestore.exception';
import { FirestoreCollections } from '../../shared/utils/constants/firestore.constant';
import { PROMISES_STATUS } from '../../shared/utils/constants/promise.constant';
import { GCP_FIRESTORE } from '../../shared/utils/constants/providers.constant';
import { IFirestoreUser } from '../users/profile/models/user-profile.interface';
import { UserProfileMapper } from '../users/profile/models/user-profile.mapper';
import { IAnswer, IFirestoreAnswer } from './answers/models/answer.interface';
import { AnswerMapper } from './answers/models/answer.mapper';
import { IFirestoreQuestion, IQuestion } from './questions/models/question.interface';
import { QuestionMapper } from './questions/models/question.mapper';

@Injectable()
export class QuestionsAnswersRepository {
    private readonly questionsCollection: CollectionReference;
    private readonly answersCollection: CollectionReference;
    private readonly usersCollection: CollectionReference;
    constructor(@Inject(GCP_FIRESTORE) private readonly firestore: Firestore) {
        this.questionsCollection = this.firestore.collection(FirestoreCollections.QUESTIONS);
        this.answersCollection = this.firestore.collection(FirestoreCollections.ANSWERS);
        this.usersCollection = this.firestore.collection(FirestoreCollections.USERS);
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

    async getQuestionsByUser(userUid: string) {
        const userSnapshot = await this.usersCollection.doc(userUid).get();

        if (!userSnapshot.exists) throw new FirestoreDocumentNotFoundException(userUid);
        const user = UserProfileMapper.fromFirebaseDataToData({
            ...userSnapshot.data(),
        } as IFirestoreUser);

        const ops = [];

        user.questions.map((question) => ops.push(this.questionsCollection.doc(question).get()));

        const questionsResults = await Promise.allSettled(ops);

        return questionsResults
            .map((questionsResult) => {
                if (questionsResult.status === PROMISES_STATUS.FULFILLED) {
                    const snapshot =
                        questionsResult.value as FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;
                    if (snapshot.exists) {
                        return QuestionMapper.fromFirebaseDataToData(
                            snapshot.data() as unknown as IFirestoreQuestion,
                        );
                    }
                }
            })
            .filter((question) => question);
    }

    async createQuestion(userUid: string, questionUid: string, data: PartialDeep<IQuestion>) {
        await this.firestore.runTransaction(async (t) => {
            const questionRef = this.questionsCollection.doc(questionUid);
            const userRef = this.usersCollection.doc(userUid);

            t.set(
                questionRef,
                QuestionMapper.fromDataToFirebaseData({
                    uid: questionUid,
                    ...data,
                    userUid,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                }),
            );
            t.update(userRef, { questions: FieldValue.arrayUnion(questionUid) });
        });
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

    async deleteQuestion(userUid: string, questionUid: string) {
        await this.firestore.runTransaction(async (t) => {
            const questionRef = this.questionsCollection.doc(questionUid);
            const usersRef = this.usersCollection.doc(userUid);

            const snapshot = await t.get(questionRef);

            if (!snapshot.exists) throw new FirestoreDocumentNotFoundException(questionUid);

            const question = QuestionMapper.fromFirebaseDataToData({
                ...snapshot.data(),
            } as IFirestoreQuestion);

            t.delete(questionRef);
            t.update(usersRef, { questions: FieldValue.arrayUnion(questionUid) });
            question.answers.map((answer) => t.delete(this.answersCollection.doc(answer)));

            return question;
        });
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

    async getAnswersByUser(userUid: string) {
        return Promise.resolve([]);
    }

    async getAnswers(questionUid: string) {
        const question = await this.getQuestion(questionUid, false);

        const ops = [];

        question.answers.map((answer) => ops.push(this.answersCollection.doc(answer).get()));

        const answersResults = await Promise.allSettled(ops);

        return answersResults
            .map((answersResult) => {
                if (answersResult.status === PROMISES_STATUS.FULFILLED) {
                    const snapshot =
                        answersResult.value as FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;
                    if (snapshot.exists) {
                        return AnswerMapper.fromFirebaseDataToData(
                            snapshot.data() as unknown as IFirestoreAnswer,
                        );
                    }
                }
            })
            .filter((answer) => answer);
    }

    async createAnswer(
        userUid: string,
        questionUid: string,
        answerUid: string,
        data: PartialDeep<IAnswer>,
    ) {
        await this.firestore.runTransaction(async (t) => {
            const questionRef = this.questionsCollection.doc(questionUid);
            const userRef = this.usersCollection.doc(userUid);
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
            t.update(userRef, { answers: FieldValue.arrayUnion(answerUid) });
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
