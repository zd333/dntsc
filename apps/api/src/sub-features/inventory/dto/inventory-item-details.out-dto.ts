import { Expose, Type } from 'class-transformer';
import { InventoryItemUnits } from '../db-schemas/inventory-item.db-schema';

export class InventoryItemDetailsOutDto {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly unit: InventoryItemUnits;

  @Expose()
  @Type(() => String)
  public readonly tags?: Array<string>;

  @Expose()
  @Type(() => String)
  public readonly alternates?: Array<string>;
}
