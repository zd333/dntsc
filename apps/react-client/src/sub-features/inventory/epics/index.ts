import { changeItemBalanceApiCallEpic } from './change-item-balance-api-call.epic';
import { createInventoryItemApiCallEpic } from './create-inventory-item-api-call.epic';
import { Epic } from 'redux-observable';
import { fetchBalancesOnInventoryItemsUpdatesEpic } from './fetch-balances-on-inventory-items-updates.epic';
import { fetchInventoryItemsOnNavigationToInventoryEpic } from './fetch-inventory-items-on-navigation-to-inventory.epic';
import { getCurrentBalanceOfInventoryItemApiCallEpic } from './get-current-balance-of-inventory-item-api-call.epic';
import { getUsedItemsTagsApiCallEpic } from './get-used-items-tags-api-call.epic';
import { searchInventoryItemsApiCallEpic } from './search-inventory-items-api-call.epic';
import { startGettingUsedInventoryItemsTagsEpic } from './start-getting-used-inventory-items-tags.epic';
import { stopFilteringItemsOnNavigationToInventoryEpic } from './stop-filtering-items-on-navigation-to-inventory.epic';
import { updateInventoryItemApiCallEpic } from './update-inventory-item-api-call.epic';

// Add all inventory state slice epics to this array and they will be combined/added to epic middleware
export const inventoryEpics: Array<Epic> = [
  searchInventoryItemsApiCallEpic,
  fetchInventoryItemsOnNavigationToInventoryEpic,
  stopFilteringItemsOnNavigationToInventoryEpic,
  createInventoryItemApiCallEpic,
  updateInventoryItemApiCallEpic,
  getUsedItemsTagsApiCallEpic,
  startGettingUsedInventoryItemsTagsEpic,
  getCurrentBalanceOfInventoryItemApiCallEpic,
  fetchBalancesOnInventoryItemsUpdatesEpic,
  changeItemBalanceApiCallEpic,
];
