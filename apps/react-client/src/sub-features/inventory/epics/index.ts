import { createInventoryItemApiCallEpic } from './create-inventory-item-api-call.epic';
import { Epic } from 'redux-observable';
import { getUsedItemsTagsApiCallEpic } from './get-used-items-tags-api-call.epic';
import { searchInventoryItemsApiCallEpic } from './search-inventory-items-api-call.epic';
import { searchInventoryItemsOnNavigationToInventoryEpic } from './fetch-inventory-items-on-navigation-to-inventory.epic';
import { startGettingUsedInventoryItemsTagsEpic } from './start-getting-used-inventory-items-tags.epic';
import { stopFilteringItemsOnNavigationFromInventoryEpic } from './stop-filtering-items-on-navigation-from-inventory.epic';
import { updateInventoryItemApiCallEpic } from './update-inventory-item-api-call.epic';

// Add all inventory state slice epics to this array and they will be combined/added to epic middleware
export const inventoryEpics: Array<Epic> = [
  searchInventoryItemsApiCallEpic,
  searchInventoryItemsOnNavigationToInventoryEpic,
  stopFilteringItemsOnNavigationFromInventoryEpic,
  createInventoryItemApiCallEpic,
  updateInventoryItemApiCallEpic,
  getUsedItemsTagsApiCallEpic,
  startGettingUsedInventoryItemsTagsEpic,
];
