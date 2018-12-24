import { AppAccessRoles } from 'src/app-access-roles';
import { CLINIC_SCHEMA_COLLECTION_NAME } from 'src/sub-features/clinics/db-schemas/clinic.db-schema';
import { IsIdOfExistingDbEntityValidator } from 'src/validators/is-id-of-existing-db-entity.validator';
import { IsUniqueEmployeeLoginForGivenClinics } from '../validators/is-unique-employee-login-for-given-clinics.validator';
import { IsUniqueEmployeeNameForGivenClinics } from '../validators/is-unique-employee-name-for-given-clinics.validator';
import { Types } from 'mongoose';
import {
  IsString,
  MinLength,
  ArrayNotEmpty,
  ArrayUnique,
  Validate,
  IsOptional,
  IsEnum,
  NotEquals,
} from 'class-validator';

export class CreateEmployeeInDto {
  @MinLength(3)
  @IsString()
  @Validate(IsUniqueEmployeeLoginForGivenClinics)
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
  // @Validate(IsIdOfExistingDbEntityValidator, [CLINIC_SCHEMA_COLLECTION_NAME], {
  //   each: true,
  // })
  readonly clinics: Array<Types.ObjectId>;

  /**
   * Access (permissions) roles list.
   * Do not allow creating platform owners via API requests
   * (suppose this is done manually via direct DB access).
   */
  @IsOptional()
  @ArrayUnique()
  @IsEnum(AppAccessRoles, { each: true })
  @NotEquals(AppAccessRoles._PLATFORM_OWNER, { each: true })
  readonly roles?: Array<AppAccessRoles>;
}
