import { IsIdOfExistingDbEntityValidator } from '../../../../src/sub-features/shared/validators/is-id-of-existing-db-entity.validator';
import { NotUsedClinicHostNames } from '../validators/not-used-clinic-host-names.validator';
import { TENANT_SCHEMA_COLLECTION_NAME } from '../../../../src/sub-features/tenants/db-schemas/tenant.db-schema';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
  ArrayNotEmpty,
  ArrayUnique,
  IsLowercase,
  NotContains,
} from 'class-validator';

export class CreateClinicInDto {
  @IsString()
  @MinLength(3)
  public readonly name: string;

  /**
   * Tenant id.
   */
  @IsNotEmpty()
  @Validate(IsIdOfExistingDbEntityValidator, [TENANT_SCHEMA_COLLECTION_NAME])
  public readonly tenant: string;

  @ArrayNotEmpty()
  @ArrayUnique()
  @IsLowercase({ each: true })
  // TODO: replace this bull shit with single regex that matches host name without protocol and www. prefix
  @IsString({ each: true })
  @NotContains('www.', { each: true })
  @NotContains('http:', { each: true })
  @NotContains('https:', { each: true })
  @NotContains('/', { each: true })
  @NotContains('?', { each: true })
  @NotContains('&', { each: true })
  @Validate(NotUsedClinicHostNames)
  public readonly hostNames: Array<string>;
}
