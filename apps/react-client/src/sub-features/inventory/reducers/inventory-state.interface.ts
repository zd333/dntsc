import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';

export interface InventoryState {
  readonly itemsDict: {
    readonly [id: string]: InventoryItemDetailsOutDto;
  };
  readonly matchingSearchCriteriaItemIds: Array<
    InventoryItemDetailsOutDto['id']
  >;
  readonly searchItemsApiRequestInProgress: boolean;
  readonly saveNewItemApiRequestInProgress: boolean;
}
