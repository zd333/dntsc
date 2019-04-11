import { allAppAccessRoles, AppAccessRoles } from '../../../app-access-roles';
import { EMPLOYEE_SCHEMA_COLLECTION_NAME } from '../db-schemas/employee.db-schema';
import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { IsIdOfExistingDbEntityValidator } from '../../shared/validators/is-id-of-existing-db-entity.validator';
import {
  IsString,
  MinLength,
  Validate,
  IsOptional,
  ArrayUnique,
  IsIn,
  NotEquals,
  IsBoolean,
} from 'class-validator';

export class UpdateEmployeeInDtoWithClinicContext extends InDtoWithClinicContext {
  @Validate(IsIdOfExistingDbEntityValidator, [EMPLOYEE_SCHEMA_COLLECTION_NAME])
  public readonly id: string;

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

  @IsBoolean()
  public readonly isActive: boolean;
}

/**
 * DTO type for clients.
 */
export type UpdateEmployeeInDto = Pick<
  UpdateEmployeeInDtoWithClinicContext,
  Exclude<keyof UpdateEmployeeInDtoWithClinicContext, 'targetClinicId'>
>;
