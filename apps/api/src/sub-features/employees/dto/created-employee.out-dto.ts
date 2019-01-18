import { Expose } from 'class-transformer';

export class CreatedEmployeeOutDto {
  @Expose()
  public readonly id: string;
}
