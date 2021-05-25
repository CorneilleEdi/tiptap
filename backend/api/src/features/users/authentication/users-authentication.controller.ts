import { Request, Response } from 'express';
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { DevelopmentOnlyGuard } from '../../../shared/core/guards/development-only.guard';
import { asControllerResponse } from '../../../shared/core/middlewares/responses.middleware';
import {
    AuthenticateUserDto,
    CreateUserDto,
    GenerateUserIdTokenDto,
} from './users-authentication.dto';
import { UsersAuthenticationRequiredGuard } from './users-authentication.guard';
import { UsersAuthenticationService } from './users-authentication.service';

@Controller('users/auth')
export class UsersAuthenticationController {
    constructor(private readonly usersAuthenticationService: UsersAuthenticationService) {}

    @Post('')
    @UseGuards(UsersAuthenticationRequiredGuard)
    async authenticateUser(
        @Req() req: Request,
        @Res() res: Response,
        @Body() data: AuthenticateUserDto,
    ) {
        return asControllerResponse(
            res,
            await this.usersAuthenticationService.authenticateUser(req.uid, data),
        );
    }

    @Post('create')
    @UseGuards(DevelopmentOnlyGuard)
    async createUser(@Body() data: CreateUserDto) {
        return await this.usersAuthenticationService.createUser(data);
    }

    @Post('/idtoken')
    @UseGuards(DevelopmentOnlyGuard)
    async generateIdToken(@Body() data: GenerateUserIdTokenDto) {
        return await this.usersAuthenticationService.generateUserIdToken(data.uid);
    }
}
