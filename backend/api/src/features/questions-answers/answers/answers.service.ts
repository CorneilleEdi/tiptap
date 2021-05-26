import { Injectable } from '@nestjs/common';
import { UsersProfileRepository } from '../../users/profile/users-profile.repository';
import { QuestionsAnswersRepository } from '../questions-answers.repository';

@Injectable()
export class AnswersService {
    constructor(
        private readonly usersProfileRepository: UsersProfileRepository,
        private readonly questionsAnswersRepository: QuestionsAnswersRepository,
    ) {}
}
