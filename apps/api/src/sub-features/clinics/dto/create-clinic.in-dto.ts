import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateClinicInDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  /**
   * Tenant id.
   */
  @IsNotEmpty()
  @IsString()
  readonly tenant: Types.ObjectId;
}
