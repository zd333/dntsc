import { Types } from 'mongoose';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

// TODO: add missing fields (acls, specialities ..)
export class CreateEmployeeInDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  /**
   * Clinic ids.
   */
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  readonly clinics: Array<Types.ObjectId>;
}
