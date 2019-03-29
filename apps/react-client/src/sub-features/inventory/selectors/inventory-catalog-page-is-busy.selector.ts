import { createSelector } from 'reselect';
import { selectInventoryState } from './inventory-state.selector';

export const selectInventoryCatalogPageIsBusy = createSelector(
  [selectInventoryState],
  inventoryState =>
    !inventoryState || inventoryState.saveNewItemApiRequestInProgress,
);
