import { createSelector } from 'reselect';
import { InventoryItemUnits } from '@api/sub-features/inventory/db-schemas/inventory-item.db-schema';
import { selectCurrentTranslationsDictionary } from '../../../selectors/current-translations-dictionary.selector';

/**
 * For now only typings are imported from API app project to avoid bundling difficulties.
 * Thus duplicate values here
 * ! This must be synced with `allInventoryItemUnits` of API app!
 */
export const allInventoryItemUnits: Array<InventoryItemUnits> = [
  'PCS',
  'MG',
  'GR',
  'KG',
  'ML',
  'LT',
];

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
