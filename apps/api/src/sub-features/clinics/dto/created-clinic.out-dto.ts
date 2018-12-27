import { Expose } from 'class-transformer';

export class CreatedClinicOutDto {
  @Expose()
  readonly id: string;
}
