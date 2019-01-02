import { AppAccessRoles } from 'src/app-access-roles';
import { InDtoWithClinicContext } from 'src/middlewares/add-clinic-context.middleware';
import { NewEmployeeLoginIsUniqueForClinics } from '../validators/new-employee-login-is-unique-for-clinics.validator';
import {
  IsString,
  MinLength,
  ArrayUnique,
  Validate,
  IsOptional,
  IsEnum,
  NotEquals,
} from 'class-validator';

export class CreateEmployeeInDto extends InDtoWithClinicContext {
  @MinLength(3)
  @IsString()
  @Validate(NewEmployeeLoginIsUniqueForClinics)
  readonly login: string;

  @IsString()
  @MinLength(4)
  readonly password: string;

  @MinLength(3)
  @IsString()
  @Validate(NewEmployeeLoginIsUniqueForClinics)
  readonly name: string;

  /**
   * Access (permissions) roles list.
   * Do not allow creating platform owners via API requests
   * (suppose this is done manually via direct DB access).
   */
  @IsOptional()
  @ArrayUnique()
  @IsEnum(AppAccessRoles, { each: true })
  @NotEquals(AppAccessRoles._PLATFORM_OWNER, { each: true })
  readonly roles?: Array<AppAccessRoles>;
}
