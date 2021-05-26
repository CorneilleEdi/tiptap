import {
    HttpStatus,
    Injectable,
    Logger,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { CONFIGURATIONS } from '../../../../shared/configuration';
import { asServiceResponse } from '../../../../shared/core/middlewares/responses.middleware';
import { StorageService } from '../../../../shared/libs/gcp/storage';
import { ERROR_MESSAGE } from '../../../../shared/utils/constants/error-message';
import { Helpers } from '../../../../shared/utils/helpers';
import { QuestionsAnswersRepository } from '../../../questions-answers/questions-answers.repository';
import { UsersProfileRepository } from '../../profile/users-profile.repository';
import { UserCreateQuestionDto, UserUpdateQuestionDto } from './users-questions.dto';

@Injectable()
export class UsersQuestionsService {
    private readonly logger: Logger = new Logger(this.constructor.name);
    private readonly BUCKET_NAME;

    constructor(
        private readonly configService: ConfigService,
        private readonly storage: StorageService,
        private readonly usersProfileRepository: UsersProfileRepository,
        private readonly questionsAnswersRepository: QuestionsAnswersRepository,
    ) {
        this.BUCKET_NAME = this.configService.get(CONFIGURATIONS.STORAGE_QUESTIONS_IMAGES_BUCKET);
    }

    async getQuestion(userUid: string, questionUid: string) {
        const question = await this.getUserQuestion(userUid, questionUid);

        return asServiceResponse(HttpStatus.OK, `Question `, question);
    }

    async createQuestion(
        userUid: string,
        { title, content, image, topics }: UserCreateQuestionDto,
    ) {
        const questionUid = Helpers.generateUid();



        let question;

        question = await this.questionsAnswersRepository.createQuestion(userUid, questionUid, {
            title,
            content,
            topics: topics ? this.generateTopicsArray(topics) : [],
        });

        if (image) {
            try {
                const [imageLink] = await this.storage.uploadMultipleFilesBuffer({
                    bucketName: this.BUCKET_NAME,
                    buffers: [image.buffer],
                    name: questionUid + Helpers.generateNumber(4),

                    // There is a bug coming from the filename. It is not originalName
                    //@ts-ignore
                    extension: extname(image.filename),
                });

                question = await this.questionsAnswersRepository.updateQuestion(questionUid, {
                    image: imageLink,
                });
            } catch (error) {
                this.logger.error('Upload question image error', error);
            }
        }

        return asServiceResponse(HttpStatus.OK, `Question ${questionUid} created`, question);
    }

    async updateQuestion(
        userUid: string,
        questionUid: string,
        { title, content, image, topics }: UserUpdateQuestionDto,
    ) {
        const question = await this.getUserQuestion(userUid, questionUid);

        let newQuestion;

        newQuestion = await this.questionsAnswersRepository.updateQuestion(questionUid, {
            title,
            content,
            topics: topics ? this.generateTopicsArray(topics) : question.topics,
        });

        //TODO: simplify
        // Delete previous image

        if (image) {
            try {
                const [imageLink] = await this.storage.uploadMultipleFilesBuffer({
                    bucketName: this.BUCKET_NAME,
                    buffers: [image.buffer],
                    name: questionUid + Helpers.generateNumber(4),

                    // There is a bug coming from the filename. It is not originalName
                    //@ts-ignore
                    extension: extname(image.filename),
                });

                newQuestion = await this.questionsAnswersRepository.updateQuestion(questionUid, {
                    image: imageLink,
                });
            } catch (error) {
                this.logger.error('Upload question image error', error);
            }
        }

        return asServiceResponse(HttpStatus.OK, `Question ${questionUid} updated`, newQuestion);
    }

    async deleteQuestion(userUid: string, questionUid: string) {
        const question = await this.getUserQuestion(userUid, questionUid);

        await this.questionsAnswersRepository.deleteQuestion(questionUid);

        //TODO: simplify
        // TODO: Delete previous image

        return asServiceResponse(HttpStatus.OK, `Question ${questionUid} deleted`, question);
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
