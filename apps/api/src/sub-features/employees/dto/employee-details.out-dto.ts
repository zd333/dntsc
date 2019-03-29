import { Expose } from 'class-transformer';

/**
 * ! Be sure not to expose passwordHash!
 */
export class EmployeeDetailsOutDto {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly login: string;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly hasToChangePassword?: boolean;
}
