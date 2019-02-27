import { createInventoryItemApiCallEpic } from './create-inventory-item-api-call.epic';
import { Epic } from 'redux-observable';
import { searchInventoryItemsApiCallEpic } from './search-inventory-items-api-call.epic';
import { searchInventoryItemsOnNavigationToInventory } from './search-inventory-items-on-navigation-to-inventory.epic';

// Add all inventory state slice epics to this array and they will be combined/added to epic middleware
export const inventoryEpics: Array<Epic> = [
  searchInventoryItemsApiCallEpic,
  searchInventoryItemsOnNavigationToInventory,
  createInventoryItemApiCallEpic,
];
