import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { CreateInventoryItemInDto } from '@api/sub-features/inventory/dto/create-inventory-item.dto';
import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';
import { PaginatedListOutDto } from '@api/sub-features/shared/dto/paginated-list-out-dto.interface';
import {
  ApiError,
  createCommonErrorAction,
} from '../../../actions/error-modal.actions';

export enum InventoryActionTypes {
  SEARCH_ITEMS_START = '[Inventory actions] Search items start',
  SEARCH_ITEMS_SUCCESS = '[Inventory actions] Search items success',
  SEARCH_ITEMS_ERROR = '[Inventory actions] Search items error',

  CREATE_ITEM_START = '[Inventory actions] Create item start',
  CREATE_ITEM_SUCCESS = '[Inventory actions] Create item success',
  CREATE_ITEM_ERROR = '[Inventory actions] Create item error',

  UPDATE_ITEM_START = '[Inventory actions] Update item start',
  UPDATE_ITEM_ERROR = '[Inventory actions] Update item error',
}

export const InventoryActions = {
  searchItemsStart: (payload: { readonly searchString?: string }) =>
    createAction(InventoryActionTypes.SEARCH_ITEMS_START, payload),
  searchItemsSuccess: (payload: {
    readonly searchResults: PaginatedListOutDto<InventoryItemDetailsOutDto>;
  }) => createAction(InventoryActionTypes.SEARCH_ITEMS_SUCCESS, payload),
  searchItemsError: (payload: { readonly error?: ApiError }) =>
    createCommonErrorAction(InventoryActionTypes.SEARCH_ITEMS_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
    }),

  createItemStart: (payload: { readonly item: CreateInventoryItemInDto }) =>
    createAction(InventoryActionTypes.CREATE_ITEM_START, payload),
  createItemSuccess: (payload: {
    readonly id: InventoryItemDetailsOutDto['id'];
    readonly item: CreateInventoryItemInDto;
  }) => createAction(InventoryActionTypes.CREATE_ITEM_SUCCESS, payload),
  createItemError: (payload: { readonly error?: ApiError }) =>
    createCommonErrorAction(InventoryActionTypes.CREATE_ITEM_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
    }),

  updateItemStart: (payload: {
    readonly originalItem: InventoryItemDetailsOutDto;
    readonly updatedItem: InventoryItemDetailsOutDto;
  }) => createAction(InventoryActionTypes.UPDATE_ITEM_START, payload),

  updateItemError: (payload: {
    readonly originalItem: InventoryItemDetailsOutDto;
    readonly error?: ApiError;
  }) =>
    createCommonErrorAction(InventoryActionTypes.UPDATE_ITEM_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
      originalItem: payload.originalItem,
    }),
};

export type AllInventoryActions = ActionsUnion<typeof InventoryActions>;
