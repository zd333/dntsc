import { Expose } from 'class-transformer';

export class CreatedTenantOutDto {
  @Expose()
  readonly id: string;
}
