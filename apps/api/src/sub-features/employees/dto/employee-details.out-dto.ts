import { allAppAccessRoles, AppAccessRoles } from '../../../app-access-roles';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

/**
 * ! Be sure not to expose passwordHash!
 */
export class EmployeeDetailsOutDto {
  @Expose()
  @ApiModelProperty()
  public readonly id: string;

  @Expose()
  @ApiModelProperty()
  public readonly login: string;

  @Expose()
  @ApiModelProperty()
  public readonly name: string;

  @Expose()
  @ApiModelProperty()
  public readonly isActive: boolean;

  @Expose()
  @ApiModelPropertyOptional({
    isArray: true,
    enum: allAppAccessRoles,
  })
  public roles?: Array<AppAccessRoles>;
}
