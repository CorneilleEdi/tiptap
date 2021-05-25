import { Request, Response } from 'express';
import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { FirebaseAuthService } from '../../../shared/libs/firebase';
import { ERROR_MESSAGE } from '../../../shared/utils/constants/error-message';

/**
 * @name UsersAuthenticationRequiredGuard
 * @description prevent accessing some endpoint without a proper auth
 */
@Injectable()
export class UsersAuthenticationRequiredGuard implements CanActivate {
    private logger: Logger = new Logger(UsersAuthenticationRequiredGuard.name);
    constructor(private readonly firebaseAuthService: FirebaseAuthService) {}
    async canActivate(context: ExecutionContext) {
        const [request] = context.getArgs<[Request, Response]>();
        const token = this.getToken(request);
        if (token) {
            try {
                const decodedToken = await this.firebaseAuthService.verifyIdToken(token);
                request.uid = decodedToken.uid;
                return true;
            } catch (err) {
                let trace = '';
                try {
                    trace = JSON.stringify({ error: err });
                } catch (error) {}
                this.logger.error(ERROR_MESSAGE.INVALID_TOKEN, trace);
                throw new UnauthorizedException(ERROR_MESSAGE.INVALID_TOKEN);
            }
        }
        let trace = '';
        try {
            const data = {
                url: request.url,
                body: request.body,
                headers: request.headers,
                query: request.query,
            };
            trace = JSON.stringify({ error: data });
        } catch (error) {}
        this.logger.error(ERROR_MESSAGE.MISSING_AUTHENTICATION_TOKEN, trace);
        throw new BadRequestException(ERROR_MESSAGE.MISSING_AUTHENTICATION_TOKEN);
    }
    private getToken(req: Request): false | string {
        if (req.headers && req.headers['authorization']) {
            const parts = req.headers['authorization'].split(' ');
            if (Object.is(parts.length, 2) && Object.is(parts[0], 'Token')) {
                return parts[1];
            }
        }
        return false;
    }
}

/**
 * @name OptionalUsersAuthenticationRequiredGuard
 * @description optional request auth
 */
@Injectable()
export class OptionalUsersAuthenticationRequiredGuard implements CanActivate {
    constructor(private readonly firebaseAuthService: FirebaseAuthService) {}
    async canActivate(context: ExecutionContext) {
        const [request] = context.getArgs<[Request, Response]>();
        const token = this.getToken(request);
        if (token) {
            try {
                const decodedToken = await this.firebaseAuthService.verifyIdToken(token);
                request.uid = decodedToken.uid;
                return true;
            } catch (err) {
                return true;
            }
        }
        return Promise.resolve(true);
    }
    private getToken(req: Request): false | string {
        if (req.headers && req.headers['authorization']) {
            const parts = req.headers['authorization'].split(' ');
            if (Object.is(parts.length, 2) && Object.is(parts[0], 'Token')) {
                return parts[1];
            }
        }
        return false;
    }
}
