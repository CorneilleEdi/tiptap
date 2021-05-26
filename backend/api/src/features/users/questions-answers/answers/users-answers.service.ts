import { Injectable } from '@nestjs/common';
import { QuestionsAnswersRepository } from '../../../questions-answers/questions-answers.repository';
import { UsersProfileRepository } from '../../profile/users-profile.repository';

@Injectable()
export class UsersAnswersService {
    constructor(
        private readonly usersProfileRepository: UsersProfileRepository,
        private readonly questionsAnswersRepository: QuestionsAnswersRepository,
    ) {}
}
