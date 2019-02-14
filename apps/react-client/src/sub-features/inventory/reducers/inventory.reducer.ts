import { arrayToDictionary } from '../../../shared/helpers/array-to-dictionary';
import { InventoryInitialState } from './inventory-initial-state';
import { InventoryState } from './inventory-state.interface';
import {
  AllInventoryActions,
  InventoryActionTypes,
} from '../actions/inventory.actions';

export function inventoryReducer(
  state: InventoryState = InventoryInitialState,
  action: AllInventoryActions,
): InventoryState {
  switch (action.type) {
    case InventoryActionTypes.SEARCH_ITEMS_START: {
      return {
        ...state,
        searchItemsApiRequestInProgress: true,
      };
    }

    case InventoryActionTypes.SEARCH_ITEMS_SUCCESS: {
      const {
        searchResults: { items },
      } = action.payload;
      const fountItemsDict = arrayToDictionary(items, 'id');
      const itemsDict = {
        ...state.itemsDict,
        ...fountItemsDict,
      };

      return {
        ...state,
        itemsDict,
        searchItemsApiRequestInProgress: false,
      };
    }

    case InventoryActionTypes.SEARCH_ITEMS_ERROR: {
      return {
        ...state,
        searchItemsApiRequestInProgress: false,
      };
    }

    case InventoryActionTypes.CREATE_ITEM_START: {
      return {
        ...state,
        saveNewItemApiRequestInProgress: true,
      };
    }

    case InventoryActionTypes.CREATE_ITEM_SUCCESS: {
      const { id, item } = action.payload;
      const newItem = {
        id,
        ...item,
      };
      const itemsDict = {
        ...state.itemsDict,
        [id]: newItem,
      };

      return {
        ...state,
        itemsDict,
        saveNewItemApiRequestInProgress: false,
      };
    }

    case InventoryActionTypes.CREATE_ITEM_ERROR: {
      return {
        ...state,
        saveNewItemApiRequestInProgress: false,
      };
    }

    case InventoryActionTypes.UPDATE_ITEM_START: {
      const { updatedItem } = action.payload;
      const itemsDict = {
        ...state.itemsDict,
        [updatedItem.id]: updatedItem,
      };

      return {
        ...state,
        itemsDict,
      };
    }

    case InventoryActionTypes.UPDATE_ITEM_ERROR: {
      const { originalItem } = action.payload;
      const itemsDict = {
        ...state.itemsDict,
        [originalItem.id]: originalItem,
      };

      return {
        ...state,
        itemsDict,
      };
    }

    default:
      return state;
  }
}
