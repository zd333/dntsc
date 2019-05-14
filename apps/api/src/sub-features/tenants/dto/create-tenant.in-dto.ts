import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsUniqueTenantNameValidator } from '../validators/is-unique-tenant-name.validator';
import {
  PlatformFeatures,
  allPlatformFeatures,
} from '../db-schemas/tenant.db-schema';
import {
  IsString,
  MinLength,
  Validate,
  IsOptional,
  IsArray,
  IsIn,
} from 'class-validator';

const TENANT_NAME_MIN_LENGTH = 3;

export class CreateTenantInDto {
  @MinLength(TENANT_NAME_MIN_LENGTH)
  @IsString()
  @Validate(IsUniqueTenantNameValidator)
  @ApiModelProperty({
    description: 'Tenant name, should be unique.',
    minLength: TENANT_NAME_MIN_LENGTH,
  })
  public readonly name: string;

  @IsOptional()
  @IsArray()
  @IsIn(allPlatformFeatures, { each: true })
  @ApiModelPropertyOptional({
    enum: allPlatformFeatures,
  })
  public readonly features?: Array<PlatformFeatures>;
}
