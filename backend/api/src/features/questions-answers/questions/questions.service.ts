import { extname } from 'path';
import {
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersProfileRepository } from '../../../features/users/profile/users-profile.repository';
import { CONFIGURATIONS } from '../../../shared/configuration';
import { asServiceResponse } from '../../../shared/core/middlewares/responses.middleware';
import { FirestoreDocumentNotFoundException } from '../../../shared/libs/gcp/firestore/firestore.exception';
import { StorageService } from '../../../shared/libs/gcp/storage';
import { MeiliSearchService } from '../../../shared/libs/meilisearch/meilisearch.service';
import { ERROR_MESSAGE } from '../../../shared/utils/constants/error-message';
import { Helpers } from '../../../shared/utils/helpers';
import { UserNotFoundException } from '../../users/profile/users.exception';
import { QuestionsAnswersRepository } from '../questions-answers.repository';
import { CreateQuestionDto, SearchQuestionsDto, UpdateQuestionDto } from './questions.dto';

@Injectable()
export class QuestionsService {
    private readonly logger: Logger = new Logger(this.constructor.name);
    private readonly BUCKET_NAME;

    constructor(
        private readonly configService: ConfigService,
        private readonly storage: StorageService,
        private readonly meiliSearchService: MeiliSearchService,
        private readonly usersProfileRepository: UsersProfileRepository,
        private readonly questionsAnswersRepository: QuestionsAnswersRepository,
    ) {
        this.BUCKET_NAME = this.configService.get(CONFIGURATIONS.STORAGE_QUESTIONS_IMAGES_BUCKET);
    }

    async searchQuestionsWithKey(data: SearchQuestionsDto) {
        const question = await this.questionsAnswersRepository.searchQuestions(data.key);

        return asServiceResponse(
            HttpStatus.OK,
            `Questions search result with key ${data.key} `,
            question,
        );
    }

    async getQuestion(userUid: string, questionUid: string) {
        const question = await this.questionsAnswersRepository.getQuestion(questionUid);

        if (!question) {
            throw new NotFoundException(`question ${questionUid} not found`);
        }

        return asServiceResponse(HttpStatus.OK, `Question `, question);
    }

    async getQuestionWithDetails(uid: string, questionUid: string) {
        const question = await this.questionsAnswersRepository.getQuestion(questionUid);

        if (!question) {
            throw new NotFoundException(`question ${questionUid} not found`);
        }

        const [answers, user] = await Promise.all([
            this.questionsAnswersRepository.getAnswers(questionUid),
            this.usersProfileRepository.getUser(question.userUid),
        ]);

        Object.assign(question, { fullAnswers: answers });
        Object.assign(question, { userProfile: user });

        return asServiceResponse(HttpStatus.OK, `Question ${questionUid}`, question);
    }

    async getQuestionsByUser(userUid: string) {
        try {
            const questions = await this.questionsAnswersRepository.getQuestionsByUser(userUid);
            return asServiceResponse(HttpStatus.OK, `Questions by user ${userUid}`, questions);
        } catch (error) {
            if (error instanceof FirestoreDocumentNotFoundException) {
                throw new UserNotFoundException(userUid);
            }
            throw new InternalServerErrorException();
        }
    }

    async createQuestion(userUid: string, { title, content, image, topics }: CreateQuestionDto) {
        const questionUid = Helpers.generateUid();

        let imageUrl: string = null;

        if (image) {
            try {
                [imageUrl] = await this.storage.uploadMultipleFilesBuffer({
                    bucketName: this.BUCKET_NAME,
                    buffers: [image.buffer],
                    name: questionUid + Helpers.generateNumber(4),

                    // There is a bug coming from the filename. It is not originalName
                    //@ts-ignore
                    extension: extname(image.filename),
                });
            } catch (error) {
                this.logger.error('Upload question image error', error);
            }
        }

        const question = await this.questionsAnswersRepository.createQuestion(
            userUid,
            questionUid,
            {
                title,
                content,
                topics: topics ? this.generateTopicsArray(topics) : [],
                image: imageUrl ?? '',
            },
        );
        return asServiceResponse(HttpStatus.OK, `Question ${questionUid} created`, question);
    }

    async updateQuestion(
        userUid: string,
        questionUid: string,
        { title, content, image, topics }: UpdateQuestionDto,
    ) {
        const question = await this.getUserQuestion(userUid, questionUid);

        let imageUrl: string = null;

        if (image) {
            try {
                [imageUrl] = await this.storage.uploadMultipleFilesBuffer({
                    bucketName: this.BUCKET_NAME,
                    buffers: [image.buffer],
                    name: questionUid + Helpers.generateNumber(4),

                    // There is a bug coming from the filename. It is not originalName
                    //@ts-ignore
                    extension: extname(image.filename),
                });
            } catch (error) {
                this.logger.error('Upload question image error', error);
            }
        }

        const newQuestion = await this.questionsAnswersRepository.updateQuestion(questionUid, {
            title,
            content,
            topics: topics ? this.generateTopicsArray(topics) : question.topics,
            image: imageUrl ? imageUrl : question.image,
        });
        return asServiceResponse(HttpStatus.OK, `Question ${questionUid} updated`, newQuestion);
    }

    async deleteQuestion(userUid: string, questionUid: string) {
        const question = await this.getUserQuestion(userUid, questionUid);

        await this.questionsAnswersRepository.deleteQuestion(userUid, questionUid);

        //TODO: simplify
        // TODO: Delete previous image

        return asServiceResponse(HttpStatus.OK, `Question ${questionUid} deleted`, question);
    }

    async deleteAll() {
        await this.questionsAnswersRepository.deleteAllQuestions();
        return asServiceResponse(HttpStatus.OK, `Questions deleted`, {});
    }

    private async getUserQuestion(userUid: string, questionUid: string) {
        const question = await this.questionsAnswersRepository.getQuestion(questionUid);

        if (!question) {
            throw new NotFoundException(`question ${questionUid} not found`);
        }

        if (question.userUid !== userUid) {
            throw new UnauthorizedException(ERROR_MESSAGE.UNAUTHORIZED_ACTION);
        }

        return question;
    }

    private generateTopicsArray(topics: string): string[] {
        return topics
            .split(',')
            .map((topic) => topic.trim())
            .filter((topic) => topic);
    }
}
