import { IsString } from 'class-validator';

export class CreateAnswerDto {
    @IsString()
    content: string;
}

export class UpdateAnswerDto {
    @IsString()
    content: string;
}
