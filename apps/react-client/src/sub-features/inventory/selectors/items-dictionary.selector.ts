import { createSelector } from 'reselect';
import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';
import { InventoryItemUnits } from '@api/sub-features/inventory/db-schemas/inventory-item.db-schema';
import { Omitted } from '../../../shared/types/omitted.type';
import { selectInventoryState } from './inventory-state.selector';
import { selectRawItemsDict } from './raw-items-dictionary.selector';

const selectItemsBalancesDict = createSelector(
  [selectInventoryState],
  inventoryState => (inventoryState && inventoryState.itemsBalancesDict) || {},
);

/**
 * Returns dictionary of view model inventory items.
 * Use results of this selector in all other selector which produce data for UI.
 */
export const selectItemsDict = createSelector(
  [selectRawItemsDict, selectItemsBalancesDict],
  (rawItemsDict, itemsBalancesDict) =>
    Object.getOwnPropertyNames(rawItemsDict || {}).reduce(
      (accumulator, currentId) => ({
        ...accumulator,
        [currentId]: rawItemsDict[currentId]
          ? {
              ...rawItemsDict[currentId],
              alternates: (rawItemsDict[currentId].alternates || []).map(
                alternateId => ({
                  id: alternateId,
                  name: rawItemsDict[alternateId].name,
                }),
              ),
              balance: itemsBalancesDict[currentId],
            }
          : undefined,
      }),
      {},
    ) as {
      readonly [id: string]: InventoryItemVM;
    },
);

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
/**
 * View model.
 */
export type InventoryItemVM = Omitted<
  InventoryItemDetailsOutDto,
  'alternates'
  // TODO: add balance
> & {
  readonly alternates?: Array<Pick<InventoryItemVM, 'id' | 'name'>>;
  readonly balance?: number;
};
