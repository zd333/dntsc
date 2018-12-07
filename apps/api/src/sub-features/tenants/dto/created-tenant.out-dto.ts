import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class CreatedTenantOutDto {
  @Expose()
  readonly id: Types.ObjectId;
}
