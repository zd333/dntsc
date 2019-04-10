import { AppRequest } from '../../../app.module';
import { CreateEmployeeRegistrationTokenInDtoWithClinicContext } from '../dto/create-employee-registration-token.in-dto';
import { hasRoles } from '../../../sub-features/shared/helpers/has-roles';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

/**
 * Checks that user is trying to create (registration token for) clinic owner employee
 * and verifies if he is platform owner if so.
 * Makes sense only for create employee registration token endpoint.
 */
@Injectable()
export class RequesterIsPlatformOwnerIfCreatesClinicOwnerGuard
  implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const req: AppRequest = context.switchToHttp().getRequest();
    const { body: dto, user: requestUser } = req;

    const isCreatingClinicOwner = hasRoles({
      target: dto as CreateEmployeeRegistrationTokenInDtoWithClinicContext,
      roles: ['_CLINIC_OWNER'],
    });

    if (!isCreatingClinicOwner) {
      return true;
    }

    const isPlatformOwner = hasRoles({
      target: requestUser,
      roles: ['_PLATFORM_OWNER'],
    });

    if (!isPlatformOwner) {
      throw new ForbiddenException();
    }

    return true;
  }
}
