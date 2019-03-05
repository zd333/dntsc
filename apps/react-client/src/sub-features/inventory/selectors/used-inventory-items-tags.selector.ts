import { createSelector } from 'reselect';
import { selectInventoryState } from './inventory-state.selector';

export const selectUsedInventoryItemsTags = createSelector(
  [selectInventoryState],
  inventoryState => (inventoryState && inventoryState.usedTags) || [],
);
