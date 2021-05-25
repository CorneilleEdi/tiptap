import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { asServiceResponse } from '../../../shared/core/middlewares/responses.middleware';
import { FirebaseAuthService } from '../../../shared/libs/firebase';
import { UsersProfileRepository } from '../profile/users-profile.repository';
import { AuthenticateUserDto, CreateUserDto } from './users-authentication.dto';

@Injectable()
export class UsersAuthenticationService {
    constructor(
        private readonly usersProfileRepository: UsersProfileRepository,
        private readonly firebaseAuthService: FirebaseAuthService,
    ) { }

    async authenticateUser(userUid: string, { email, phoneNumber, profileImage, name }: AuthenticateUserDto) {
        if (!email && !phoneNumber) {
            throw new BadRequestException('Email or phone number is required');
        }

        const registeredUser = await this.usersProfileRepository.getUser(userUid);

        // User is not registered yet, sign up
        if (!registeredUser) {
            const user = await this.usersProfileRepository.createUser(userUid, {
                name,
                profileImage,
                authenticationInfo: {
                    email,
                    phoneNumber,
                    lastLogin: Date.now(),
                },
            });

            return asServiceResponse(HttpStatus.CREATED, 'User created', user);
        } else {
            const user = await this.usersProfileRepository.updateUser(userUid, {
                name,
                profileImage,
                authenticationInfo: {
                    email,
                    phoneNumber,
                    lastLogin: Date.now(),
                },
            });

            return asServiceResponse(HttpStatus.OK, 'User logged in', user);
        }
    }

    // Create user for test purpose
    async createUser(data: CreateUserDto) {
        const user = await this.firebaseAuthService.createFirebaseUser({
            email: data.email,
            emailVerified: true,
        });

        return asServiceResponse(HttpStatus.OK, 'User logged in', user);
    }

    /**
     * generateUserIdToken
     * @name generateUserIdToken
     * @description generate User IdToken for debugging
     * @param {string} uid
     */
    async generateUserIdToken(uid: string) {
        const res = await this.firebaseAuthService.generateUserIdToken(uid);
        return asServiceResponse(HttpStatus.OK, 'token', res);
    }
}
