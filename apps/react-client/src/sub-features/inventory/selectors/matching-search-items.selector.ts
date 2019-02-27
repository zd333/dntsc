import { createSelector } from 'reselect';
import { InventoryItem } from '../components/InventoryItemsList';
import { selectInventoryState } from './inventory-state.selector';

export const selectMatchingSearchItems = createSelector(
  [selectInventoryState],
  inventoryState => {
    if (
      !inventoryState ||
      !Array.isArray(inventoryState.matchingSearchCriteriaItemIds) ||
      !inventoryState.itemsDict
    ) {
      return [];
    }

    const dict = inventoryState.itemsDict;

    return inventoryState.matchingSearchCriteriaItemIds.map(id => {
      const item: InventoryItem = {
        ...dict[id],
        alternates: (dict[id].alternates || []).map(alternateId => ({
          id: alternateId,
          name: dict[alternateId].name,
        })),
      };

      return item;
    });
  },
);
