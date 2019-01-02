import { AppAccessRoles } from 'src/app-access-roles';
import { AppRequest } from 'src/app.module';
import { hasRoles } from 'src/sub-features/shared/helpers/has-roles';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

/**
 * Checks that user is trying to create platform or clinic owner employee
 * and verifies if he is active platform owner if so.
 * Makes sense only for create employee endpoint.
 */
@Injectable()
export class RequesterIsPlatformOwnerIfCreatesClinicOwnerGuard
  implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: AppRequest = context.switchToHttp().getRequest();
    const { body: dto, user: requestUser } = req;

    const isCreatingClinicOwner = hasRoles({
      target: dto,
      roles: [AppAccessRoles._CLINIC_OWNER],
    });

    if (!isCreatingClinicOwner) {
      return true;
    }

    const isActivePlatformOwner =
      !!requestUser &&
      !!requestUser.isActive &&
      hasRoles({
        target: requestUser,
        roles: [AppAccessRoles._PLATFORM_OWNER],
      });

    if (!isActivePlatformOwner) {
      throw new ForbiddenException();
    }

    return true;
  }
}
