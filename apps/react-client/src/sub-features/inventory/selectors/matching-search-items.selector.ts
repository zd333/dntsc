import { createSelector } from 'reselect';
import { selectInventoryState } from './inventory-state.selector';
import { selectItemsDict } from './items-dictionary.selector';

const selectMatchingSearchCriteriaItemIds = createSelector(
  [selectInventoryState],
  inventoryState =>
    inventoryState && inventoryState.matchingSearchCriteriaItemIds,
);

export const selectMatchingSearchItems = createSelector(
  [selectMatchingSearchCriteriaItemIds, selectItemsDict],
  (matchingSearchCriteriaItemIds, itemsDict) =>
    Array.isArray(matchingSearchCriteriaItemIds) && itemsDict
      ? matchingSearchCriteriaItemIds
          .map(id => itemsDict[id])
          .filter(item => !!item)
      : [],
);
