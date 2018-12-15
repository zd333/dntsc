import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

/**
 * ! Be sure not to expose passwordHash!
 */
export class EmployeeDetailsOutDto {
  @Expose()
  readonly id: Types.ObjectId;

  @Expose()
  readonly login: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly hasToChangePassword?: boolean;
}
