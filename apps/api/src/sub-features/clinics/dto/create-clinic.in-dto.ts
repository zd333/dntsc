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

export class CreateClinicInDto {
  @IsString()
  @MinLength(3)
  @ApiModelProperty()
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
  })
  public readonly hostNames: Array<string>;
}
