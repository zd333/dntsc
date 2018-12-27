import { Expose } from 'class-transformer';

/**
 * ! Be sure not to expose passwordHash!
 */
export class EmployeeDetailsOutDto {
  @Expose()
  readonly id: string;

  @Expose()
  readonly login: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly hasToChangePassword?: boolean;
}
