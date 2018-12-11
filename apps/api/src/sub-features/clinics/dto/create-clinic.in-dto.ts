import { IsIdOfExistingDbEntityValidator } from 'src/validators/is-id-of-existing-db-entity.validator';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  Validate
  } from 'class-validator';
import { TENANT_SCHEMA_NAME } from 'src/sub-features/tenants/db-schemas/tenant.db-schema';
import { Types } from 'mongoose';

export class CreateClinicInDto {
  @IsString()
  @MinLength(3)
  readonly name: string;

  /**
   * Tenant id.
   */
  @IsNotEmpty()
  @Validate(IsIdOfExistingDbEntityValidator, [TENANT_SCHEMA_NAME])
  readonly tenant: Types.ObjectId;
}
