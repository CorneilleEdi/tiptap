import { Request } from 'express';
import { memoryStorage } from 'multer';
import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileHelpers } from '../../../shared/utils/helpers';
import { UsersAuthenticationRequiredGuard } from '../authentication/users-authentication.guard';
import { UsersProfileService } from './users-profile.service';

@Controller('users/profile')
@UseGuards(UsersAuthenticationRequiredGuard)
export class UsersProfileController {
    constructor(private readonly usersProfileService: UsersProfileService) {}

    /**
     * @name getCurrentUserProfile
     * @description get all users (probably to be deleted after)
     */
    @Get('')
    async getCurrentUserProfile(@Req() req: Request) {
        return await this.usersProfileService.getCurrentUserProfile(req.uid);
    }

    @Patch('')
    async updateUserProfile(@Req() req: Request, @Body() data: any) {
        return await this.usersProfileService.updateUserProfile(req.uid, data);
    }

    @Patch('image')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: memoryStorage(),
            fileFilter: FileHelpers.imageFileFilter,
        }),
    )
    async updateUserProfileImage(@Req() req: Request, @UploadedFile() image: Express.Multer.File) {
        return await this.usersProfileService.updateUserImage(req.uid, image);
    }

    /**
     * @name resetUserProfileImage
     * @description reset user profile image
     * @param {Express.Request} req
     */
    @Delete('image')
    async resetUserProfileImage(@Req() req: Request) {
        return await this.usersProfileService.resetUserImage(req.uid);
    }
}
