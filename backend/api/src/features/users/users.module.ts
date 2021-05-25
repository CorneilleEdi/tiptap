import { Module } from '@nestjs/common';
import { UsersAuthenticationModule } from './authentication/users-authentication.module';
import { UsersProfileModule } from './profile/users-profile.module';

@Module({
    imports: [UsersProfileModule, UsersAuthenticationModule],
})
export class UsersModule {}
