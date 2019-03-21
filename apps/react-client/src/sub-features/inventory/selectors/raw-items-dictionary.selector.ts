import { createSelector } from 'reselect';
import { selectInventoryState } from './inventory-state.selector';

export const selectRawItemsDict = createSelector(
  [selectInventoryState],
  inventoryState => (inventoryState && inventoryState.itemsDict) || {},
);
