import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';

export interface InventoryState {
  readonly itemsDict: {
    readonly [id: string]: InventoryItemDetailsOutDto;
  };
  readonly showFilteredItems: boolean;
  readonly matchingSearchCriteriaItemIds: Array<
    InventoryItemDetailsOutDto['id']
  >;
  readonly searchItemsApiRequestInProgress: boolean;
  readonly saveNewItemApiRequestInProgress: boolean;
  /**
   * Set of unique tags that are already used in inventory items.
   * Use it for item tags typeahead.
   */
  readonly usedTags: Array<string>;
}
