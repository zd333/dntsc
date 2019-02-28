import { createInventoryItemApiConnector } from './create-inventory-item.api-connector';
import { searchInventoryItemsApiConnector } from './search-inventory-items.api-connector';
import { updateInventoryItemApiConnector } from './update-inventory-item.api-connector';

/**
 * This should have structure that follows epic middleware dependency injection interface.
 * See `createEpicMiddleware`.
 */
export const inventoryApiConnectors = {
  searchInventoryItemsApiConnector,
  createInventoryItemApiConnector,
  updateInventoryItemApiConnector,
};
