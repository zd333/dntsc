import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

// TODO: add missing fields
export class EmployeeDetailsOutDto {
  @Expose()
  readonly id: Types.ObjectId;

  @Expose()
  readonly login: string;

  @Expose()
  readonly name: string;
}
