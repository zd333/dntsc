import { Types } from 'mongoose';
import {
  IsString,
  MinLength,
  ArrayNotEmpty,
  ArrayUnique,
  IsMongoId,
} from 'class-validator';

// TODO: add missing fields (acls, specialities ..)
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
  // TODO: replace with IsIdOfExisting entity
  @IsMongoId({
    each: true,
  })
  readonly clinics: Array<Types.ObjectId>;
}
