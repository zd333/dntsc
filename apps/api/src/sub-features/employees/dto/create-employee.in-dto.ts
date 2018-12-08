import { CLINIC_SCHEMA_NAME } from 'src/sub-features/clinics/db-schemas/clinic.db-schema';
import { IsIdOfExistingDbEntity } from 'src/validators/is-id-of-existing-db-entity.validator';
import { Types } from 'mongoose';
import {
  IsString,
  MinLength,
  ArrayNotEmpty,
  ArrayUnique,
  Validate,
} from 'class-validator';

export class CreateEmployeeInDto {
  @MinLength(3)
  @IsString()
  readonly login: string;

  @IsString()
  @MinLength(4)
  readonly password: string;

  @MinLength(3)
  @IsString()
  readonly name: string;

  /**
   * Clinic ids.
   */
  @ArrayNotEmpty()
  @ArrayUnique()
  // TODO: looks like currently this does not support each validation, fix in github?
  @Validate(IsIdOfExistingDbEntity, [CLINIC_SCHEMA_NAME], { each: true })
  readonly clinics: Array<Types.ObjectId>;
}
