import { createSelector } from 'reselect';
import { InventoryItemDetailsFormProps } from '../components/InventoryItemDetailsForm';
import { selectAllItems } from './all-items.selector';
import {
  InventoryItem,
  allInventoryItemUnits,
} from './items-dictionary.selector';

const getAlternatesSuggestions = (
  allItems: Array<InventoryItem>,
): InventoryItemDetailsFormProps['alternatesSuggestions'] =>
  allInventoryItemUnits.reduce(
    (accumulator, current) => ({
      ...accumulator,
      [current]: (allItems || []).filter(item => item.unit === current),
    }),
    {},
  ) as InventoryItemDetailsFormProps['alternatesSuggestions'];

export const selectAlternatesSuggestions = createSelector(
  [selectAllItems],
  getAlternatesSuggestions,
);
