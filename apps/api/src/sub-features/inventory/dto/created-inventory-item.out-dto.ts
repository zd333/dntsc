import { Expose } from 'class-transformer';

export class CreatedInventoryItemOutDto {
  @Expose()
  readonly id: string;
}
