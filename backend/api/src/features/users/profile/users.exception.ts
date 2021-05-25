import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(id?: string) {
        super(`user ${id} not found`);
    }
}
