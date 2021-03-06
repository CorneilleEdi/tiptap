import { Request } from 'express';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UsersAuthenticationRequiredGuard } from '../../users/authentication/users-authentication.guard';
import { CreateAnswerDto, UpdateAnswerDto } from './answers.dto';
import { AnswersService } from './answers.service';

@Controller('')
export class AnswersController {
    constructor(private readonly answersService: AnswersService) {}

    @Get('answers/users/:userUid')
    async getAnswersByUser(@Param('userUid') userUid: string) {
        return await this.answersService.getAnswersByUser(userUid);
    }

    @Get('questions/:questionUid/answers/:answerUid')
    async getAnswer(
        @Req() req: Request,
        @Param('questionUid') questionUid: string,
        @Param('answerUid') answerUid: string,
    ) {
        return await this.answersService.getAnswer(req.uid, answerUid);
    }

    @Get('questions/:questionUid/answers')
    async getAnswers(@Req() req: Request, @Param('questionUid') questionUid: string) {
        return await this.answersService.getAnswers(req.uid, questionUid);
    }

    @Post('questions/:questionUid/answers')
    @UseGuards(UsersAuthenticationRequiredGuard)
    async createAnswer(
        @Req() req: Request,
        @Param('questionUid') questionUid: string,
        @Body() data: CreateAnswerDto,
    ) {
        return await this.answersService.createAnswer(req.uid, questionUid, data);
    }

    @Patch('questions/:questionUid/answers/:answerUid')
    @UseGuards(UsersAuthenticationRequiredGuard)
    async updateQuestion(
        @Req() req: Request,
        @Param('questionUid') questionUid: string,
        @Param('answerUid') answerUid: string,
        @Body() data: UpdateAnswerDto,
    ) {
        return await this.answersService.updateAnswer(req.uid, answerUid, data);
    }

    @Delete('questions/:questionUid/answers/:answerUid')
    @UseGuards(UsersAuthenticationRequiredGuard)
    async deleteQuestion(
        @Req() req: Request,
        @Param('questionUid') questionUid: string,
        @Param('answerUid') answerUid: string,
    ) {
        return await this.answersService.deleteAnswer(req.uid, questionUid, answerUid);
    }
}
