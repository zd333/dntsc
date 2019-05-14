import { allAppAccessRoles, AppAccessRoles } from '../../../app-access-roles';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { EMPLOYEE_NAME_MIN_LENGTH } from './register-employee.in-dto';
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
  @ApiModelProperty()
  public readonly id: string;

  @MinLength(EMPLOYEE_NAME_MIN_LENGTH)
  @IsString()
  @ApiModelProperty({
    minLength: EMPLOYEE_NAME_MIN_LENGTH,
  })
  public readonly name: string;

  @IsOptional()
  @ArrayUnique()
  @IsIn(allAppAccessRoles, { each: true })
  @NotEquals('_PLATFORM_OWNER', { each: true })
  @ApiModelPropertyOptional({
    isArray: true,
    uniqueItems: true,
    enum: allAppAccessRoles,
    description: `
      Access (permissions) roles list.
      Do not allow creating platform owners via API requests
      (suppose this is done manually via direct DB access).
    `,
  })
  public readonly roles?: Array<AppAccessRoles> | null;

  @IsBoolean()
  @ApiModelProperty()
  public readonly isActive: boolean;
}

/**
 * DTO type for clients.
 */
export type UpdateEmployeeInDto = Pick<
  UpdateEmployeeInDtoWithClinicContext,
  Exclude<keyof UpdateEmployeeInDtoWithClinicContext, 'targetClinicId'>
>;
