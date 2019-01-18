import { Expose } from 'class-transformer';

export class CreatedClinicOutDto {
  @Expose()
  public readonly id: string;
}
