import { Expose } from 'class-transformer';

export class CreatedEmployeeOutDto {
  @Expose()
  readonly id: string;
}
