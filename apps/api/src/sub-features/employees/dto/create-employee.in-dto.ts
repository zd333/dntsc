import { CLINIC_SCHEMA_NAME } from 'src/sub-features/clinics/db-schemas/clinic.db-schema';
import { IsIdOfExistingDbEntityValidator } from 'src/validators/is-id-of-existing-db-entity.validator';
import { IsUniqueEmployeeNameForGivenClinics } from '../validators/is-unique-employee-name-for-given-clinics.validator';
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
  @Validate(IsUniqueEmployeeNameForGivenClinics)
  readonly name: string;

  /**
   * Clinic ids.
   */
  @ArrayNotEmpty()
  @ArrayUnique()
  // TODO: currently does not work, update class-validator after this PR is merged
  // https://github.com/typestack/class-validator/pull/295
  // or refactor to validate whole array if not merged
  // @Validate(IsIdOfExistingDbEntityValidator, [CLINIC_SCHEMA_NAME], {
  //   each: true,
  // })
  readonly clinics: Array<Types.ObjectId>;
}
