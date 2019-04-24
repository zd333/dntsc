import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { InventoryItemVM } from '../selectors/items-dictionary.selector';
import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';
import { Omitted } from '../../../shared/types/omitted.type';
import { PaginatedListOutDto } from '@api/sub-features/shared/dto/paginated-list-out-dto.interface';
import {
  ApiError,
  createCommonErrorAction,
} from '../../../actions/error-modal.actions';

export enum InventoryActionTypes {
  FETCH_ITEMS_START = '[Inventory] Fetch items start',
  FETCH_ITEMS_SUCCESS = '[Inventory] Fetch items success',
  FETCH_ITEMS_ERROR = '[Inventory] Fetch items error',

  TOGGLE_SHOW_FILTERED_ITEMS_MODE = '[Inventory] Toggle show filtered items mode',

  FETCH_AND_FILTER_ITEMS_START = '[Inventory] Fetch and filter items start',
  FETCH_AND_FILTER_ITEMS_SUCCESS = '[Inventory] Fetch and filter items success',
  FETCH_AND_FILTER_ITEMS_ERROR = '[Inventory] Fetch and filter items error',

  CREATE_ITEM_START = '[Inventory] Create item start',
  CREATE_ITEM_SUCCESS = '[Inventory] Create item success',
  CREATE_ITEM_ERROR = '[Inventory] Create item error',

  UPDATE_ITEM_START = '[Inventory] Update item start',
  UPDATE_ITEM_ERROR = '[Inventory] Update item error',

  GET_USED_TAGS_START = '[Inventory] Get used tags start',
  GET_USED_TAGS_SUCCESS = '[Inventory] Get used tags success',
  GET_USED_TAGS_ERROR = '[Inventory] Get used tags error',
}

export const InventoryActions = {
  fetchItemsStart: (payload: {
    readonly searchString?: string;
    readonly tagsToFilterBy?: Array<string>;
    readonly alternatesOf?: InventoryItemVM['id'];
    readonly unitToFilterBy?: InventoryItemVM['unit'];
  }) => createAction(InventoryActionTypes.FETCH_ITEMS_START, payload),
  fetchItemsSuccess: (payload: {
    readonly fetchResults: PaginatedListOutDto<InventoryItemDetailsOutDto>;
  }) => createAction(InventoryActionTypes.FETCH_ITEMS_SUCCESS, payload),
  fetchItemsError: (payload: { readonly error?: ApiError }) =>
    createCommonErrorAction(InventoryActionTypes.FETCH_ITEMS_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
    }),

  toggleShowFilteredItemsMode: (payload: {
    readonly showFilteredItems: boolean;
  }) =>
    createAction(InventoryActionTypes.TOGGLE_SHOW_FILTERED_ITEMS_MODE, payload),

  fetchAndFilterItemsStart: (payload: {
    readonly searchString?: string;
    readonly tagsToFilterBy?: Array<string>;
    readonly alternatesOf?: InventoryItemVM['id'];
    readonly unitToFilterBy?: InventoryItemVM['unit'];
  }) =>
    createAction(InventoryActionTypes.FETCH_AND_FILTER_ITEMS_START, payload),
  fetchAndFilterItemsSuccess: (payload: {
    readonly searchResults: PaginatedListOutDto<InventoryItemDetailsOutDto>;
  }) =>
    createAction(InventoryActionTypes.FETCH_AND_FILTER_ITEMS_SUCCESS, payload),
  fetchAndFilterItemsError: (payload: { readonly error?: ApiError }) =>
    createCommonErrorAction(InventoryActionTypes.FETCH_AND_FILTER_ITEMS_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
    }),

  createItemStart: (payload: {
    readonly newItemData: Omitted<InventoryItemVM, 'id'>;
  }) => createAction(InventoryActionTypes.CREATE_ITEM_START, payload),
  createItemSuccess: (payload: {
    readonly id: InventoryItemVM['id'];
    readonly newItemData: Omitted<InventoryItemVM, 'id'>;
  }) => createAction(InventoryActionTypes.CREATE_ITEM_SUCCESS, payload),
  createItemError: (payload: {
    readonly error?: ApiError;
    readonly newItemData: Omitted<InventoryItemVM, 'id'>;
  }) =>
    createCommonErrorAction(InventoryActionTypes.CREATE_ITEM_ERROR, {
      isCommonErrorAction: true,
      error: payload.error,
      newItemData: payload.newItemData,
    }),

  updateItemStart: (payload: {
    readonly id: InventoryItemVM['id'];
    readonly itemUpdates: Omitted<InventoryItemVM, 'id'>;
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
