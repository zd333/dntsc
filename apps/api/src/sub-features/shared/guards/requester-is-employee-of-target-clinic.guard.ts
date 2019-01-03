import { AppAccessRoles } from 'src/app-access-roles';
import { AppRequest } from 'src/app.module';
import { AuthenticatedUser } from 'src/sub-features/authentication/services/authentication.service';
import { hasRoles } from '../helpers/has-roles';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

/**
 * Checks that request is by authenticated user which is employee of related clinic
 * (or is platform owner).
 */
@Injectable()
export class RequesterIsEmployeeOfTargetClinicGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const req: AppRequest = context.switchToHttp().getRequest();
    const user: AuthenticatedUser = req.user;
    if (!user) {
      throw new ForbiddenException();
    }

    const userIsEmployeeOfThisClinic =
      user.isEmployee &&
      Array.isArray(user.clinics) &&
      user.clinics.some(userClinic => userClinic === req.targetClinicId);
    if (userIsEmployeeOfThisClinic) {
      return true;
    }

    const userIsPlatformOwner = hasRoles({
      target: user,
      roles: [AppAccessRoles._PLATFORM_OWNER],
    });

    if (userIsPlatformOwner) {
      return true;
    }

    throw new ForbiddenException();
  }
}
