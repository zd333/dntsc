import { InventoryItemUnits } from '../db-schemas/inventory-item.db-schema';

/**
 * Checks that provided inventory item has weight (KG, GR, MG) unit.
 */
export function inventoryItemHasWeightUnit<
  T extends { readonly unit: InventoryItemUnits }
>(item: T): boolean {
  return (
    !!item &&
    (item.unit === InventoryItemUnits.kg ||
      item.unit === InventoryItemUnits.gr ||
      item.unit === InventoryItemUnits.mg)
  );
}
