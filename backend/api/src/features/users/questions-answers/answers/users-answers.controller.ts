import { Controller } from '@nestjs/common';
import { UsersAnswersService } from './users-answers.service';

@Controller('answers')
export class UsersAnswersController {
    constructor(private readonly usersAnswersService: UsersAnswersService) {}
}
