import { InventoryItemUnits } from '../db-schemas/inventory-item.db-schema';

/**
 * Checks that provided inventory item has volume (ML, LT) unit.
 */
export function inventoryItemHasVolumeUnit<
  T extends { readonly unit: InventoryItemUnits }
>(item: T): boolean {
  return (
    !!item &&
    (item.unit === InventoryItemUnits.lt || item.unit === InventoryItemUnits.ml)
  );
}
