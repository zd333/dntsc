import { Expose, Type } from 'class-transformer';
import { InventoryItemUnits } from '../db-schemas/inventory-item.db-schema';

export class InventoryItemDetailsOutDto {
  @Expose()
  readonly name: string;

  @Expose()
  readonly unit: InventoryItemUnits;

  @Expose()
  @Type(() => String)
  readonly alternates?: Array<string>;
}
