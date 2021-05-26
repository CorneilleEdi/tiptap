import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { UsersAuthenticationRequiredGuard } from '../../authentication/users-authentication.guard';
import { UserCreateQuestionDto, UserUpdateQuestionDto } from './users-questions.dto';
import { UsersQuestionsService } from './users-questions.service';

@Controller('questions')
@UseGuards(UsersAuthenticationRequiredGuard)
export class UsersQuestionsController {
    constructor(private readonly usersQuestionsService: UsersQuestionsService) { }


    @Get(':questionUid')
    async getQuestion(@Req() req: Request, @Param('questionUid') questionUid: string) {
        return await this.usersQuestionsService.getQuestion(req.uid, questionUid);
    }

    @Post('')
    @FormDataRequest()
    @UseGuards(UsersAuthenticationRequiredGuard)
    async createQuestion(@Req() req: Request, @Body() data: UserCreateQuestionDto) {
        return await this.usersQuestionsService.createQuestion(req.uid, data);
    }

    @Patch(':questionUid')
    @FormDataRequest()
    @UseGuards(UsersAuthenticationRequiredGuard)
    async updateQuestion(@Req() req: Request, @Param('questionUid') questionUid: string, @Body() data: UserUpdateQuestionDto) {
        return await this.usersQuestionsService.updateQuestion(req.uid, questionUid, data);
    }

    @Delete(':questionUid')
    async deleteQuestion(@Req() req: Request, @Param('questionUid') questionUid: string) {
        return await this.usersQuestionsService.deleteQuestion(req.uid, questionUid);
    }
}
