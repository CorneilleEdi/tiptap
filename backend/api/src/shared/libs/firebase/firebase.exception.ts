import { BadRequestException, NotFoundException } from '@nestjs/common';

export class FirebaseUserNotFoundException extends NotFoundException { }
export class FirebaseRequestFailedException extends BadRequestException { }
