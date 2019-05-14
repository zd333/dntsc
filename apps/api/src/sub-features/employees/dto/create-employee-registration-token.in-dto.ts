import { allAppAccessRoles, AppAccessRoles } from '../../../app-access-roles';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { ArrayUnique, IsIn, IsOptional, NotEquals } from 'class-validator';
import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';

export class CreateEmployeeRegistrationTokenInDtoWithClinicContext extends InDtoWithClinicContext {
  @IsOptional()
  @ArrayUnique()
  @IsIn(allAppAccessRoles, { each: true })
  @NotEquals('_PLATFORM_OWNER', { each: true })
  @ApiModelPropertyOptional({
    isArray: true,
    enum: allAppAccessRoles,
    uniqueItems: true,
    description: `
      Access (permissions) roles list.
      Do not allow creating platform owners via API requests
      (suppose this is done manually via direct DB access).
    `,
  })
  public readonly roles?: Array<AppAccessRoles>;
}

/**
 * DTO type for clients.
 */
export type CreateEmployeeRegistrationTokenInDto = Pick<
  CreateEmployeeRegistrationTokenInDtoWithClinicContext,
  Exclude<
    keyof CreateEmployeeRegistrationTokenInDtoWithClinicContext,
    'targetClinicId'
  >
>;
