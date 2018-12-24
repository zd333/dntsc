import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class CreatedInventoryItemOutDto {
  @Expose()
  readonly id: Types.ObjectId;
}
