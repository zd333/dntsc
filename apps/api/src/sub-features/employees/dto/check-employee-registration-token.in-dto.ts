import { EmployeeRegistrationTokenOutDto } from './employee-registration-token.out-dto';
import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { IsNotExpiredJwtTokenValidator } from '../../shared/validators/is-not-expired-jwt-token.validator';
import { IsNotUsedEmployeeRegistrationToken } from '../validators/is-not-used-employee-registration-token.validator';
import { Validate } from 'class-validator';

export class CheckEmployeeRegistrationTokenInDtoWithClinicContext extends InDtoWithClinicContext {
  @Validate(IsNotExpiredJwtTokenValidator)
  @Validate(IsNotUsedEmployeeRegistrationToken)
  public readonly registrationToken: EmployeeRegistrationTokenOutDto['registrationToken'];
}

/**
 * DTO type for clients.
 */
export type CheckEmployeeRegistrationTokenInDto = Pick<
  CheckEmployeeRegistrationTokenInDtoWithClinicContext,
  Exclude<
    keyof CheckEmployeeRegistrationTokenInDtoWithClinicContext,
    'targetClinicId'
  >
>;
