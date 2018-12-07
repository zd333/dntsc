import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class CreatedEmployeeOutDto {
  @Expose()
  readonly id: Types.ObjectId;
}
