import { searchInventoryItemsApiConnector } from './search-inventory-items.api-connector';

/**
 * This should have structure that follows epic middleware dependency injection interface.
 * See `createEpicMiddleware`.
 */
export const inventoryApiConnectors = { searchInventoryItemsApiConnector };
