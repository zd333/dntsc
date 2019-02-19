import { createSelector } from 'reselect';
import { InventoryItem } from '../components/InventoryItemsList';
import { selectInventoryState } from './inventory-state.selector';

export const selectAllInventoryItems = createSelector(
  [selectInventoryState],
  inventoryState => {
    const dict = (!!inventoryState && inventoryState.itemsDict) || {};

    return Object.keys(dict).map(key => {
      const item: InventoryItem = {
        ...dict[key],
        alternates: (dict[key].alternates || []).map(alternateId => ({
          id: alternateId,
          name: dict[alternateId].name,
        })),
      };

      return item;
    });
  },
);
