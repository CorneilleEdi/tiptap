import { Request } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersAuthenticationRequiredGuard } from '../../users/authentication/users-authentication.guard';
import { CreateQuestionDto, UpdateQuestionDto } from './questions.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
@UseGuards(UsersAuthenticationRequiredGuard)
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Get(':questionUid')
    async getQuestion(@Req() req: Request, @Param('questionUid') questionUid: string) {
        return await this.questionsService.getQuestion(req.uid, questionUid);
    }

    @Post('')
    @FormDataRequest()
    @UseGuards(UsersAuthenticationRequiredGuard)
    async createQuestion(@Req() req: Request, @Body() data: CreateQuestionDto) {
        return await this.questionsService.createQuestion(req.uid, data);
    }

    @Patch(':questionUid')
    @FormDataRequest()
    @UseGuards(UsersAuthenticationRequiredGuard)
    async updateQuestion(
        @Req() req: Request,
        @Param('questionUid') questionUid: string,
        @Body() data: UpdateQuestionDto,
    ) {
        return await this.questionsService.updateQuestion(req.uid, questionUid, data);
    }

    @Delete(':questionUid')
    async deleteQuestion(@Req() req: Request, @Param('questionUid') questionUid: string) {
        return await this.questionsService.deleteQuestion(req.uid, questionUid);
    }
}
