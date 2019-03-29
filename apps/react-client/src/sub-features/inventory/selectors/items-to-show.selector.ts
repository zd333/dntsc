import { createSelector } from 'reselect';
import { selectAllItems } from './all-items.selector';
import { selectInventoryState } from './inventory-state.selector';
import { selectMatchingSearchItems } from './matching-search-items.selector';

const selectShowFilteredItems = createSelector(
  [selectInventoryState],
  inventoryState => !!inventoryState && inventoryState.showFilteredItems,
);

export const selectItemsToShow = createSelector(
  [selectShowFilteredItems, selectAllItems, selectMatchingSearchItems],
  (showFilteredItems, allItems, matchingSearchItems) =>
    showFilteredItems ? matchingSearchItems : allItems,
);
