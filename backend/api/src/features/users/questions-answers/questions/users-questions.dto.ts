import { IsOptional, IsString, Length } from 'class-validator';
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';

export class UserCreateQuestionDto {
    @IsString()
    @Length(6)
    title: string;

    @IsString()
    @Length(6)
    content: string;

    @IsFile()
    @HasMimeType(['image/jpeg', 'image/jpg', 'image/png'])
    @IsOptional()
    image: MemoryStoredFile;

    @IsString()
    @IsOptional()
    topics: string;
}

export class UserUpdateQuestionDto {
    @IsString()
    @Length(6)
    @IsOptional()
    title: string;

    @IsString()
    @Length(6)
    @IsOptional()
    content: string;

    @IsFile()
    @HasMimeType(['image/jpeg', 'image/jpg', 'image/png'])
    @IsOptional()
    image: MemoryStoredFile;

    @IsString()
    @IsOptional()
    topics: string;
}
