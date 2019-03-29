import { InventoryItemUnits } from '../db-schemas/inventory-item.db-schema';

/**
 * Checks that provided inventory item has PCS unit.
 */
export function inventoryItemHasPcsUnit<
  T extends { readonly unit: InventoryItemUnits }
>(item: T): boolean {
  return !!item && item.unit === 'PCS';
}
