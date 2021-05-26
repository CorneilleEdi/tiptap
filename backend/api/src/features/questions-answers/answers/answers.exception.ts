import { NotFoundException } from '@nestjs/common';

export class AnswerNotFoundException extends NotFoundException {
    constructor(id: string) {
        super(`Answer ${id} not found`);
    }
}
