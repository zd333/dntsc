import { IsIdOfExistingDbEntity } from 'src/shared/validators/is-id-of-existing-db-entity.validator';
import { IsString, MinLength, Validate } from 'class-validator';
import { TENANT_SCHEMA_NAME } from 'src/sub-features/tenants/db-schemas/tenant.db-schema';
import { Types } from 'mongoose';

export class CreateClinicInDto {
  @IsString()
  @MinLength(3)
  readonly name: string;

  /**
   * Tenant id.
   */
  @Validate(IsIdOfExistingDbEntity, [TENANT_SCHEMA_NAME])
  readonly tenant: Types.ObjectId;
}
