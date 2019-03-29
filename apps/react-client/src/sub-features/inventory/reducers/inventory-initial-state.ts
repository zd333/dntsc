import { InventoryState } from './inventory-state.interface';

export const InventoryInitialState: InventoryState = {
  itemsDict: {},
  showFilteredItems: false,
  matchingSearchCriteriaItemIds: [],
  searchItemsApiRequestInProgress: false,
  saveNewItemApiRequestInProgress: false,
  usedTags: [],
};
