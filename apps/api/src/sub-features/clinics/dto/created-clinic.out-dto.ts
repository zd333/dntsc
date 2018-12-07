import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class CreatedClinicOutDto {
  @Expose()
  readonly id: Types.ObjectId;
}
