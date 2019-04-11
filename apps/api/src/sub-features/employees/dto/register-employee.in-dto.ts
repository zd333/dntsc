import { allAppAccessRoles, AppAccessRoles } from '../../../app-access-roles';
import { EmployeeRegistrationTokenOutDto } from './employee-registration-token.out-dto';
import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { IsNotExpiredJwtTokenValidator } from '../../shared/validators/is-not-expired-jwt-token.validator';
import { IsString, MinLength, Validate } from 'class-validator';
import { IsUniqueEmployeeLoginForGivenClinic } from '../validators/is-unique-employee-login-for-given-clinic.validator';

export class RegisterEmployeeInDtoWithClinicContext extends InDtoWithClinicContext {
  @MinLength(3)
  @IsString()
  @Validate(IsUniqueEmployeeLoginForGivenClinic)
  public readonly login: string;

  @IsString()
  @MinLength(4)
  public readonly password: string;

  @MinLength(3)
  @IsString()
  public readonly name: string;

  @Validate(IsNotExpiredJwtTokenValidator)
  public readonly registrationToken: EmployeeRegistrationTokenOutDto['registrationToken'];
}

/**
 * DTO type for clients.
 */
export type RegisterEmployeeInDto = Pick<
  RegisterEmployeeInDtoWithClinicContext,
  Exclude<keyof RegisterEmployeeInDtoWithClinicContext, 'targetClinicId'>
>;
