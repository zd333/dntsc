import { createSelector } from 'reselect';
import { selectInventoryState } from './inventory-state.selector';

export const selectAllItemsDict = createSelector(
  [selectInventoryState],
  inventoryState => (inventoryState && inventoryState.itemsDict) || {},
);
