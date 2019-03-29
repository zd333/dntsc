import { allAppAccessRoles, AppAccessRoles } from '../../../app-access-roles';
import { InDtoWithClinicContext } from '../../../../src/middlewares/add-clinic-context.middleware';
import { IsUniqueEmployeeLoginForGivenClinic } from '../validators/is-unique-employee-login-for-given-clinic.validator';
import {
  IsString,
  MinLength,
  ArrayUnique,
  Validate,
  IsOptional,
  NotEquals,
  IsIn,
} from 'class-validator';

export class CreateEmployeeInDtoWithClinicContext extends InDtoWithClinicContext {
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

  /**
   * Access (permissions) roles list.
   * Do not allow creating platform owners via API requests
   * (suppose this is done manually via direct DB access).
   */
  @IsOptional()
  @ArrayUnique()
  @IsIn(allAppAccessRoles, { each: true })
  @NotEquals('_PLATFORM_OWNER', { each: true })
  public readonly roles?: Array<AppAccessRoles>;
}

/**
 * DTO type for clients.
 */
export type CreateEmployeeInDto = Pick<
  CreateEmployeeInDtoWithClinicContext,
  Exclude<keyof CreateEmployeeInDtoWithClinicContext, 'targetClinicId'>
>;
