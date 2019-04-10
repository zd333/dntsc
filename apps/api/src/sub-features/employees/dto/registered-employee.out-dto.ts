import { Expose } from 'class-transformer';

export class RegisteredEmployeeOutDto {
  @Expose()
  public readonly id: string;
}
