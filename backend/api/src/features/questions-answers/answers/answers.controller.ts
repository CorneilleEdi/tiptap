import { Request } from 'express';
import { UsersAuthenticationRequiredGuard } from 'src/features/users/authentication/users-authentication.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateAnswerDto, UpdateAnswerDto } from './answers.dto';
import { AnswersService } from './answers.service';

@Controller('questions')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) {}

    @Get(':questionUid/answers/:answerUid')
    async getAnswer(
        @Req() req: Request,
        @Param('questionUid') questionUid: string,
        @Param('answerUid') answerUid: string,
    ) {
        return await this.answersService.getAnswer(req.uid, answerUid);
    }

    @Post(':questionUid/answers')
    @UseGuards(UsersAuthenticationRequiredGuard)
    async createAnswer(
        @Req() req: Request,
        @Param('questionUid') questionUid: string,
        @Body() data: CreateAnswerDto,
    ) {
        return await this.answersService.createAnswer(req.uid, questionUid, data);
    }

    @Patch(':questionUid/answers/:answerUid')
    @UseGuards(UsersAuthenticationRequiredGuard)
    async updateQuestion(
        @Req() req: Request,
        @Param('questionUid') questionUid: string,
        @Param('answerUid') answerUid: string,
        @Body() data: UpdateAnswerDto,
    ) {
        return await this.answersService.updateAnswer(req.uid, answerUid, data);
    }

    @Delete(':questionUid/answers/:answerUid')
    @UseGuards(UsersAuthenticationRequiredGuard)
    async deleteQuestion(
        @Req() req: Request,
        @Param('questionUid') questionUid: string,
        @Param('answerUid') answerUid: string,
    ) {
        return await this.answersService.deleteAnswer(req.uid, questionUid, answerUid);
    }
}
