import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { InventoryItem } from '../components/InventoryItemsList';
import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';
import { Omitted } from '../../../shared/types/omitted.type';
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

  GET_USED_TAGS_START = '[Inventory actions] Get used tags start',
  GET_USED_TAGS_SUCCESS = '[Inventory actions] Get used tags success',
  GET_USED_TAGS_ERROR = '[Inventory actions] Get used tags error',
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

  createItemStart: (payload: {
    readonly newItemData: Omitted<InventoryItem, 'id'>;
  }) => createAction(InventoryActionTypes.CREATE_ITEM_START, payload),
  createItemSuccess: (payload: {
    readonly id: InventoryItem['id'];
    readonly newItemData: Omitted<InventoryItem, 'id'>;
  }) => createAction(InventoryActionTypes.CREATE_ITEM_SUCCESS, payload),
  createItemError: (payload: {
    readonly error?: ApiError;
    readonly newItemData: Omitted<InventoryItem, 'id'>;
  }) =>
    createCommonErrorAction(InventoryActionTypes.CREATE_ITEM_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
      newItemData: payload.newItemData,
    }),

  updateItemStart: (payload: {
    readonly id: InventoryItem['id'];
    readonly itemUpdates: Omitted<InventoryItem, 'id'>;
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

  getUsedTagsStart: () =>
    createAction(InventoryActionTypes.GET_USED_TAGS_START),
  getUsedTagsSuccess: (payload: { readonly usedTags: Array<string> }) =>
    createAction(InventoryActionTypes.GET_USED_TAGS_SUCCESS, payload),
  getUsedTagsError: (payload: { readonly error?: ApiError }) =>
    createCommonErrorAction(InventoryActionTypes.GET_USED_TAGS_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
    }),
};

export type AllInventoryActions = ActionsUnion<typeof InventoryActions>;
