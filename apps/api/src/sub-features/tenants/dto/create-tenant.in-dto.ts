import { IsString, MinLength, Validate } from 'class-validator';
import { IsUniqueTenantNameValidator } from '../validators/is-unique-tenant-name.validator';

export class CreateTenantInDto {
  @MinLength(3)
  @IsString()
  @Validate(IsUniqueTenantNameValidator)
  readonly name: string;
}
