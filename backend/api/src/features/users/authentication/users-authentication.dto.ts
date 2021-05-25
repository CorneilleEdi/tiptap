import { IsEmail, IsOptional, IsString, Length, Matches } from 'class-validator';

export class AuthenticateUserDto {
    @IsEmail()
    @IsOptional()
    email: string;

    @IsString({ message: 'phone number must be a string' })
    @Matches(/^\+?[1-9]\d{1,14}$/, {
        message: 'invalid phone number',
    })
    @IsOptional()
    public phoneNumber: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    profileImage: string;
}

export class CreateUserDto {
    @IsEmail()
    email: string;
}

export class GenerateUserIdTokenDto {
    @IsString()
    @Length(20)
    uid: string;
}
