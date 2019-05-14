import { ApiModelProperty } from '@nestjs/swagger';
import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { IsString, MinLength } from 'class-validator';
import {
  EMPLOYEE_LOGIN_MIN_LENGTH,
  EMPLOYEE_PASSWORD_MIN_LENGTH,
} from '../../employees/dto/register-employee.in-dto';

export class SignInEmployeeInDtoWithClinicContext extends InDtoWithClinicContext {
  @MinLength(EMPLOYEE_LOGIN_MIN_LENGTH)
  @IsString()
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
}

/**
 * DTO type for clients.
 */
export type SignInEmployeeInDto = Pick<
  SignInEmployeeInDtoWithClinicContext,
  Exclude<keyof SignInEmployeeInDtoWithClinicContext, 'targetClinicId'>
>;

/**
 * Platform owners have no clinic context.
 */
export type SignInPlatformOwnerInDto = SignInEmployeeInDto;
