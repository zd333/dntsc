import { ApiModelProperty } from '@nestjs/swagger';
import { EmployeeRegistrationTokenOutDto } from './employee-registration-token.out-dto';
import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { IsNotExpiredJwtTokenValidator } from '../../shared/validators/is-not-expired-jwt-token.validator';
import { IsNotUsedEmployeeRegistrationToken } from '../validators/is-not-used-employee-registration-token.validator';
import { IsString, MinLength, Validate } from 'class-validator';
import { IsUniqueEmployeeLoginForGivenClinic } from '../validators/is-unique-employee-login-for-given-clinic.validator';

export const EMPLOYEE_LOGIN_MIN_LENGTH = 3;
export const EMPLOYEE_PASSWORD_MIN_LENGTH = 4;
export const EMPLOYEE_NAME_MIN_LENGTH = 3;

export class RegisterEmployeeInDtoWithClinicContext extends InDtoWithClinicContext {
  @MinLength(EMPLOYEE_LOGIN_MIN_LENGTH)
  @IsString()
  @Validate(IsUniqueEmployeeLoginForGivenClinic)
  @ApiModelProperty({
    minLength: EMPLOYEE_LOGIN_MIN_LENGTH,
  })
  public readonly login: string;

  @IsString()
  @MinLength(EMPLOYEE_PASSWORD_MIN_LENGTH)
  @ApiModelProperty({
    minLength: EMPLOYEE_PASSWORD_MIN_LENGTH,
  })
  public readonly password: string;

  @MinLength(EMPLOYEE_NAME_MIN_LENGTH)
  @IsString()
  @ApiModelProperty({
    minLength: EMPLOYEE_NAME_MIN_LENGTH,
  })
  public readonly name: string;

  @Validate(IsNotExpiredJwtTokenValidator)
  @Validate(IsNotUsedEmployeeRegistrationToken)
  @ApiModelProperty()
  public readonly registrationToken: EmployeeRegistrationTokenOutDto['registrationToken'];
}

/**
 * DTO type for clients.
 */
export type RegisterEmployeeInDto = Pick<
  RegisterEmployeeInDtoWithClinicContext,
  Exclude<keyof RegisterEmployeeInDtoWithClinicContext, 'targetClinicId'>
>;
