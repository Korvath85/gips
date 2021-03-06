import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserEntity } from '../modules/entities/user.entity';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = <UserEntity>request.user;
    AuthService.setAuthUser(user);

    return next.handle();
  }
}
