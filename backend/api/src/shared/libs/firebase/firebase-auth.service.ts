import {
    BadRequestException,
    HttpService,
    Inject,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { auth } from 'firebase-admin';
import { FIREBASE_AUTH } from '../../utils/constants/providers.constant';
import { SECRETS } from '../../utils/constants/secrets.constant';
import { SecretsService } from '../gcp/secrets';
import { FirebaseUserNotFoundException } from './firebase.exception';

@Injectable()
export class FirebaseAuthService {
    constructor(
        @Inject(FIREBASE_AUTH)
        private firebaseAuth: auth.Auth,
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly secretsServices: SecretsService,
    ) { }

    /**
     * createFirebaseUser
     * @name createFirebaseUser
     * @description created firebase user
     * @param {auth.CreateRequest} data user data
     */
    async createFirebaseUser(data: auth.CreateRequest) {
        return await this.firebaseAuth.createUser(data);
    }

    /**
     * updateFirebaseUser
     * @name updateFirebaseUser
     * @description update firebase user
     * @param {string} uid user uid
     * @param {auth.UpdateRequest} data user new data
     */
    async updateFirebaseUser(uid: string, data: auth.UpdateRequest) {
        return await this.firebaseAuth.updateUser(uid, data);
    }

    /**
     * getUserByUid
     * @name getUserByUid
     * @description get firebase user by uid
     * @param {string} uid
     */
    async getUserByUid(uid: string) {
        try {
            return await this.firebaseAuth.getUser(uid);
        } catch (error) {
            if (error.errorInfo?.code === 'auth/user-not-found') {
                throw new FirebaseUserNotFoundException();
            }

            throw error;
        }
    }

    /**
     * getUserByEmail
     * @name getUserByEmail
     * @description get firebase user by email
     * @param {string} email
     */
    async getUserByEmail(email: string) {
        try {
            return await this.firebaseAuth.getUserByEmail(email);
        } catch (error) {
            if (error.errorInfo?.code === 'auth/user-not-found') {
                throw new FirebaseUserNotFoundException();
            }

            throw error;
        }
    }

    /**
     * getUserByPhoneNumber
     * @name getUserByPhoneNumber
     * @description get firebase user by phone number
     * @param {string} phoneNumber
     */
    async getUserByPhoneNumber(phoneNumber: string) {
        try {
            return await this.firebaseAuth.getUserByPhoneNumber(phoneNumber);
        } catch (error) {
            if (error.errorInfo?.code === 'auth/user-not-found') {
                throw new FirebaseUserNotFoundException();
            }

            throw error;
        }
    }

    /**
     * deleteUser
     * @name deleteUser
     * @description delete user
     * @param {string} phoneNumber
     */
    async deleteUser(phoneNumber: string) {
        try {
            return await this.firebaseAuth.deleteUser(phoneNumber);
        } catch (error) {
            if (error.errorInfo?.code === 'auth/user-not-found') {
                throw new FirebaseUserNotFoundException();
            }

            throw error;
        }
    }

    async verifyIdToken(idToken: string) {
        return await this.firebaseAuth.verifyIdToken(idToken, true);
    }

    async createCustomAuthToken(uid: string) {
        return await this.firebaseAuth.createCustomToken(uid);
    }

    /**
     * generateUserIdToken
     * @name generateUserIdToken
     * @description generate User IdToken for debugging
     * @param {string} uid
     */
    async generateUserIdToken(uid: string) {
        try {
            const key = await this.secretsServices.getSecret(SECRETS.FIREBASE_WEB_KEY);
            await this.firebaseAuth.getUser(uid);
            const customToken = await this.firebaseAuth.createCustomToken(uid);
            const res = await this.httpService
                .post(
                    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${key}`,
                    {
                        token: customToken,
                        returnSecureToken: true,
                    },
                )
                .toPromise();
            return res.data;
        } catch (error) {
            if (error.code && error.code === 'auth/user-not-found') {
                throw new NotFoundException('user do not exist');
            }
            throw new BadRequestException(`Some went wrong: ${error?.message || ''}`);
        }
    }
}
