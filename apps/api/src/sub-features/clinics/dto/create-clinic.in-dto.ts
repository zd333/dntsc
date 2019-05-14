import { ApiModelProperty } from '@nestjs/swagger';
import { IsIdOfExistingDbEntityValidator } from '../../../sub-features/shared/validators/is-id-of-existing-db-entity.validator';
import { NotUsedClinicHostNames } from '../validators/not-used-clinic-host-names.validator';
import { TENANT_SCHEMA_COLLECTION_NAME } from '../../../sub-features/tenants/db-schemas/tenant.db-schema';
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

const CLINIC_NAME_MIN_LENGTH = 3;

export class CreateClinicInDto {
  @IsString()
  @MinLength(CLINIC_NAME_MIN_LENGTH)
  @ApiModelProperty({
    minLength: CLINIC_NAME_MIN_LENGTH,
  })
  public readonly name: string;

  @IsNotEmpty()
  @Validate(IsIdOfExistingDbEntityValidator, [TENANT_SCHEMA_COLLECTION_NAME])
  @ApiModelProperty({
    description: 'Tenant id.',
  })
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
  @ApiModelProperty({
    description: `
      Clinic hosts (addresses).
      Should not contain www prefix, protocol or path.
      Should be lowercase.
      Should be unique.
    `,
    isArray: true,
    minItems: 1,
    uniqueItems: true,
  })
  public readonly hostNames: Array<string>;
}
