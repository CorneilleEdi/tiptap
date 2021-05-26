import { NotFoundException } from '@nestjs/common';

export class QuestionNotFoundException extends NotFoundException {
    constructor(id: string) {
        super(`Question ${id} not found`);
    }
}
