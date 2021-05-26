import {
    BadRequestException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { asServiceResponse } from '../../../shared/core/middlewares/responses.middleware';
import { FirestoreDocumentNotFoundException } from '../../../shared/libs/gcp/firestore/firestore.exception';
import { ERROR_MESSAGE } from '../../../shared/utils/constants/error-message';
import { Helpers } from '../../../shared/utils/helpers';
import { UsersProfileRepository } from '../../users/profile/users-profile.repository';
import { UserNotFoundException } from '../../users/profile/users.exception';
import { QuestionsAnswersRepository } from '../questions-answers.repository';
import { QuestionNotFoundException } from '../questions/questions.exception';
import { CreateAnswerDto } from './answers.dto';
import { AnswerNotFoundException } from './answers.exception';

@Injectable()
export class AnswersService {
    constructor(
        private readonly usersProfileRepository: UsersProfileRepository,
        private readonly questionsAnswersRepository: QuestionsAnswersRepository,
    ) {}

    async getAnswer(userUid: string, answerUid: string) {
        const answer = await this.questionsAnswersRepository.getAnswer(answerUid);

        if (!answer) throw new AnswerNotFoundException(answerUid);

        return asServiceResponse(HttpStatus.OK, 'Answer', answer);
    }

    async getAnswers(userUid: string, questionUid: string) {
        const answers = await this.questionsAnswersRepository.getAnswers(questionUid);

        return asServiceResponse(HttpStatus.OK, `Answers of question ${questionUid}`, answers);
    }

    async getAnswersByUser(userUid: string) {
        try {
            const answers = await this.questionsAnswersRepository.getAnswersByUser(userUid);
            return asServiceResponse(HttpStatus.OK, `Answers by user ${userUid}`, answers);
        } catch (error) {
            if (error instanceof FirestoreDocumentNotFoundException) {
                throw new UserNotFoundException(userUid);
            }
            throw new InternalServerErrorException();
        }
    }

    async createAnswer(userUid: string, questionUid: string, data: CreateAnswerDto) {
        try {
            const answerUid = Helpers.generateUid();
            const answer = await this.questionsAnswersRepository.createAnswer(
                userUid,
                questionUid,
                answerUid,
                { content: data.content },
            );

            return asServiceResponse(HttpStatus.CREATED, 'Answer created', answer);
        } catch (error) {
            if (error instanceof FirestoreDocumentNotFoundException) {
                throw new QuestionNotFoundException(questionUid);
            }
            throw new BadRequestException('Create answer fails');
        }
    }

    async updateAnswer(userUid: string, answerUid: string, data: CreateAnswerDto) {
        await this.getAnswerAndCheckIfBelongToUser(userUid, answerUid);
        try {
            const answer = await this.questionsAnswersRepository.updateAnswer(answerUid, {
                content: data.content,
            });

            return asServiceResponse(HttpStatus.OK, 'Answer updated', answer);
        } catch (error) {
            if (error instanceof FirestoreDocumentNotFoundException) {
                throw new AnswerNotFoundException(answerUid);
            }
            throw new BadRequestException('update answer fails');
        }
    }

    async deleteAnswer(userUid: string, questionUid: string, answerUid: string) {
        await this.getAnswerAndCheckIfBelongToUser(userUid, answerUid);
        try {
            const answer = await this.questionsAnswersRepository.deleteAnswer(
                questionUid,
                answerUid,
            );
            return asServiceResponse(HttpStatus.OK, `Answer ${answerUid} deleted`, answer);
        } catch (error) {
            if (error instanceof FirestoreDocumentNotFoundException) {
                throw new AnswerNotFoundException(questionUid);
            }
            throw new BadRequestException('Create answer fails');
        }
    }

    private async getAnswerAndCheckIfBelongToUser(userUid: string, answerUid: string) {
        const answer = await this.questionsAnswersRepository.getAnswer(answerUid);

        if (!answer) throw new AnswerNotFoundException(answerUid);

        if (answer.userUid !== userUid)
            throw new UnauthorizedException(ERROR_MESSAGE.UNAUTHORIZED_ACTION);

        return answer;
    }
}
