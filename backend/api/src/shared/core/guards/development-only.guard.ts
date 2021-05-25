import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigurationService } from '../../configuration';

/**
 * @name DevelopmentOnlyGuard
 * @description prevent accessing some endpoints in production
 */
@Injectable()
export class DevelopmentOnlyGuard implements CanActivate {
    constructor(private readonly configurationService: ConfigurationService) {}
    canActivate(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isLocal = this.configurationService.isLocal;
        if (!isLocal) {
            throw new UnauthorizedException(
                'Are you kidding me 🤬? What are you trying to do 😡 😠?',
            );
        }
        return true;
    }
}
