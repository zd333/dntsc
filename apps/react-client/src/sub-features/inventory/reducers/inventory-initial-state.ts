import { InventoryState } from './inventory-state.interface';

export const InventoryInitialState: InventoryState = {
  itemsDict: {},
  matchingSearchCriteriaItemIds: [],
  searchItemsApiRequestInProgress: false,
  saveNewItemApiRequestInProgress: false,
  usedTags: [],
};
