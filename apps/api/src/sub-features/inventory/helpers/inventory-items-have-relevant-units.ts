import { inventoryItemHasPcsUnit } from './inventory-item-has-pcs-unit';
import { inventoryItemHasVolumeUnit } from './inventory-item-has-volume-unit';
import { inventoryItemHasWeightUnit } from './inventory-item-has-weight-unit';
import { InventoryItemUnits } from '../db-schemas/inventory-item.db-schema';

export function inventoryItemsHaveRelevantUnits<
  T extends { readonly unit: InventoryItemUnits },
  V extends { readonly unit: InventoryItemUnits }
>(item1: T, item2: V): boolean {
  return (
    (inventoryItemHasPcsUnit(item1) && inventoryItemHasPcsUnit(item2)) ||
    (inventoryItemHasVolumeUnit(item1) && inventoryItemHasVolumeUnit(item2)) ||
    (inventoryItemHasWeightUnit(item1) && inventoryItemHasWeightUnit(item2))
  );
}
