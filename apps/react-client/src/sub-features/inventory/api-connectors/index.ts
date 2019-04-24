import { createInventoryItemApiConnector } from './create-inventory-item.api-connector';
import { getUsedInInventoryItemsTagsApiConnector } from './get-used-in-inventory-items-tags.api.connector';
import { searchInventoryItemsApiConnector } from './search-inventory-items.api-connector';
import { updateInventoryItemApiConnector } from './update-inventory-item.api-connector';

export const inventoryApiConnectors = {
  searchInventoryItemsApiConnector,
  createInventoryItemApiConnector,
  updateInventoryItemApiConnector,
  getUsedInInventoryItemsTagsApiConnector,
};
