import { AppRequest } from 'src/app.module';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

/**
 * Checks that request is by authenticated user which is employee.
 */
@Injectable()
export class IsEmployeeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: AppRequest = context.switchToHttp().getRequest();

    if (!req.user || !req.user.IsEmployee) {
      throw new ForbiddenException();
    }

    return true;
  }
}
