import { AppRequest } from '../../../app.module';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';

/**
 * Ensures that request is for particular clinic
 * by checking if `clinicId` request property is defined.
 * See `DetermineClinicByHostNameMiddleware`.
 */
@Injectable()
export class RequestIsInClinicContextGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const req: AppRequest = context.switchToHttp().getRequest();

    if (!req.targetClinicId) {
      throw new UnprocessableEntityException();
    }

    return true;
  }
}
