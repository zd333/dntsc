import { arrayToDictionary } from '../../../shared/helpers/array-to-dictionary';
import { InventoryInitialState } from './inventory-initial-state';
import { inventoryItemViewModelToDto } from '../helpers/inventory-item-dto-to-view-model';
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
      const foundItemsDict = arrayToDictionary(items, 'id');
      // Merge new results to all items dictionary
      const itemsDict = {
        ...state.itemsDict,
        ...foundItemsDict,
      };
      // Set ids of recently found items
      const matchingSearchCriteriaItemIds = items.map(item => item.id);

      return {
        ...state,
        itemsDict,
        matchingSearchCriteriaItemIds,
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
        [id]: inventoryItemViewModelToDto(newItem),
      };
      // Put new item to the top of the list (even if it doesn't match search)
      const matchingSearchCriteriaItemIds = [
        id,
        ...state.matchingSearchCriteriaItemIds,
      ];

      return {
        ...state,
        itemsDict,
        matchingSearchCriteriaItemIds,
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
