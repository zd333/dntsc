import { createSelector } from 'reselect';
import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';
import { InventoryItemUnits } from '@api/sub-features/inventory/db-schemas/inventory-item.db-schema';
import { Omitted } from '../../../shared/types/omitted.type';
import { selectRawItemsDict } from './raw-items-dictionary.selector';

/**
 * Returns dictionary of view model inventory items.
 * Use results of this selector in all other selector which produce data for UI.
 */
export const selectItemsDict = createSelector(
  [selectRawItemsDict],
  rawItemsDict =>
    Object.getOwnPropertyNames(rawItemsDict || {}).reduce(
      (accumulator, current) => ({
        ...accumulator,
        [current]: rawItemsDict[current]
          ? {
              ...rawItemsDict[current],
              alternates: (rawItemsDict[current].alternates || []).map(
                alternateId => ({
                  id: alternateId,
                  name: rawItemsDict[current].name,
                }),
              ),
            }
          : undefined,
      }),
      {},
    ) as {
      readonly [id: string]: InventoryItem;
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
export type InventoryItem = Omitted<
  InventoryItemDetailsOutDto,
  'alternates'
> & { readonly alternates?: Array<Pick<InventoryItem, 'id' | 'name'>> };
