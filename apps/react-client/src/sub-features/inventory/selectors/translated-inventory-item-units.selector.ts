import { allInventoryItemUnits } from './items-dictionary.selector';
import { createSelector } from 'reselect';
import { InventoryItemUnits } from '@api/sub-features/inventory/db-schemas/inventory-item.db-schema';
import { selectCurrentTranslationsDictionary } from '../../../selectors/current-translations-dictionary.selector';

export const selectTranslatedInventoryItemUnits = createSelector(
  [selectCurrentTranslationsDictionary],
  currentTranslationsDictionary =>
    allInventoryItemUnits.map(
      unitValue =>
        ({
          unitValue,
          unitLabelShort:
            currentTranslationsDictionary[
              `inventoryItemUnit.${unitValue}.short`
            ],
          unitLabelFull:
            currentTranslationsDictionary[
              `inventoryItemUnit.${unitValue}.full`
            ],
        } as TranslatedInventoryItemUnit),
    ),
);

/**
 * View model.
 */
export interface TranslatedInventoryItemUnit {
  readonly unitValue: InventoryItemUnits;
  readonly unitLabelShort: string;
  readonly unitLabelFull: string;
}
