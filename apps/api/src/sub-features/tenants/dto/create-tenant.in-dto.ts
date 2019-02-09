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

export class CreateTenantInDto {
  @MinLength(3)
  @IsString()
  @Validate(IsUniqueTenantNameValidator)
  public readonly name: string;

  @IsOptional()
  @IsArray()
  @IsIn(allPlatformFeatures, { each: true })
  public readonly features?: Array<PlatformFeatures>;
}
