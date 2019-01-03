import { IsUniqueTenantNameValidator } from '../validators/is-unique-tenant-name.validator';
import { PlatformFeatures } from '../db-schemas/tenant.db-schema';
import {
  IsString,
  MinLength,
  Validate,
  IsEnum,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateTenantInDto {
  @MinLength(3)
  @IsString()
  @Validate(IsUniqueTenantNameValidator)
  readonly name: string;

  @IsOptional()
  @IsArray()
  @IsEnum(PlatformFeatures, { each: true })
  readonly features?: PlatformFeatures;
}
