import { Expose } from 'class-transformer';

export class CreatedInventoryItemOutDto {
  @Expose()
  public readonly id: string;
}
