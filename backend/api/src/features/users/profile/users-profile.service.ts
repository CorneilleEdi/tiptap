import { extname } from 'path';
import {
    BadRequestException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIGURATIONS } from '../../../shared/configuration';
import { asServiceResponse } from '../../../shared/core/middlewares/responses.middleware';
import { StorageService } from '../../../shared/libs/gcp/storage';
import { ERROR_MESSAGE } from '../../../shared/utils/constants/error-message';
import { Helpers } from '../../../shared/utils/helpers';
import { UsersProfileRepository } from './users-profile.repository';
import { UserNotFoundException } from './users.exception';

@Injectable()
export class UsersProfileService {
    private readonly logger: Logger = new Logger(this.constructor.name);
    private readonly BUCKET_NAME;

    constructor(
        private readonly storage: StorageService,
        private readonly configService: ConfigService,
        private readonly usersProfileRepository: UsersProfileRepository,
    ) {
        this.BUCKET_NAME = this.configService.get(CONFIGURATIONS.STORAGE_USERS_IMAGE_BUCKET);
    }

    async getCurrentUserProfile(userUid: string) {
        const user = await this.usersProfileRepository.getUser(userUid, false);
        return asServiceResponse(HttpStatus.OK, `User profile `, user);
    }

    async updateUserProfile(userUid: string, data: any) {
        try {
            const user = await this.usersProfileRepository.updateUser(userUid, data);

            return asServiceResponse(HttpStatus.OK, `User profile updated`, user);
        } catch (error) {
            if (error == UserNotFoundException) {
                throw new NotFoundException(error.message);
            }

            throw new InternalServerErrorException(error.message);
        }
    }

    async updateUserImage(userUid: string, image: Express.Multer.File) {
        if (!image || !image.buffer) {
            throw new BadRequestException(ERROR_MESSAGE.SERVER_ERROR);
        }

        const user = await this.usersProfileRepository.getUser(userUid, false);

        const [profileImageLink] = await this.storage.uploadMultipleFilesBuffer({
            bucketName: this.BUCKET_NAME,
            folderName: user.uid,
            buffers: [image.buffer],
            name: user.uid + Helpers.generateNumber(4),
            extension: extname(image.originalname),
        });

        const newUser = await this.usersProfileRepository.updateUser(userUid, {
            profileImage: profileImageLink,
        });
        return asServiceResponse(HttpStatus.OK, `User profile image updated`, newUser);
    }

    async resetUserImage(userUid: string) {
        const user = await this.usersProfileRepository.getUser(userUid, false);

        try {
            if (user.profileImage) await this.storage.deleteFileWithLink(user.profileImage);
        } catch (error) {}

        const newUser = await this.usersProfileRepository.updateUser(userUid, { profileImage: '' });
        return asServiceResponse(HttpStatus.OK, `User profile image reseted`, newUser);
    }
}
