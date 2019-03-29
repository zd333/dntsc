import { Expose } from 'class-transformer';

export class CreatedTenantOutDto {
  @Expose()
  public readonly id: string;
}
