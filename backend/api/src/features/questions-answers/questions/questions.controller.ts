import { Request } from 'express';
import { FormDataRequest } from 'nestjs-form-data';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { DevelopmentOnlyGuard } from '../../../shared/core/guards/development-only.guard';
import { UsersAuthenticationRequiredGuard } from '../../users/authentication/users-authentication.guard';
import { CreateQuestionDto, UpdateQuestionDto } from './questions.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Get(':questionUid')
    @UseGuards(UsersAuthenticationRequiredGuard)
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

    @Delete('all')
    async deleteAllQuestions() {
        return await this.questionsService.deleteAll();
    }

    @Delete(':questionUid')
    @UseGuards(...[UsersAuthenticationRequiredGuard, DevelopmentOnlyGuard])
    async deleteQuestion(@Req() req: Request, @Param('questionUid') questionUid: string) {
        return await this.questionsService.deleteQuestion(req.uid, questionUid);
    }
}
