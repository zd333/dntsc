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
    case InventoryActionTypes.FETCH_ITEMS_START: {
      return {
        ...state,
        searchItemsApiRequestInProgress: true,
      };
    }

    case InventoryActionTypes.FETCH_ITEMS_SUCCESS: {
      const {
        fetchResults: { items },
      } = action.payload;
      const newItemsDict = arrayToDictionary(items, 'id');
      // Merge new results to all items dictionary
      const itemsDict = {
        ...state.itemsDict,
        ...newItemsDict,
      };

      return {
        ...state,
        itemsDict,
        searchItemsApiRequestInProgress: false,
      };
    }

    case InventoryActionTypes.TOGGLE_SHOW_FILTERED_ITEMS_MODE: {
      const { showFilteredItems } = action.payload;
      // Automatically reset matching items list when we disable filtering mode
      const matchingSearchCriteriaItemIds = showFilteredItems
        ? state.matchingSearchCriteriaItemIds
        : [];

      return {
        ...state,
        showFilteredItems,
        matchingSearchCriteriaItemIds,
      };
    }
    case InventoryActionTypes.FETCH_AND_FILTER_ITEMS_START: {
      return {
        ...state,
        searchItemsApiRequestInProgress: true,
        matchingSearchCriteriaItemIds: [],
      };
    }
    case InventoryActionTypes.FETCH_AND_FILTER_ITEMS_SUCCESS: {
      // Do same what we do with `FETCH_ITEMS_SUCCESS`, but also save `matchingSearchCriteriaItemIds`
      const {
        searchResults: { items },
      } = action.payload;
      const foundItemsDict = arrayToDictionary(items, 'id');
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
        showFilteredItems: true,
        searchItemsApiRequestInProgress: false,
      };
    }

    case InventoryActionTypes.FETCH_ITEMS_ERROR:
    case InventoryActionTypes.FETCH_AND_FILTER_ITEMS_ERROR: {
      return {
        ...state,
        showFilteredItems: false,
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
      const { id, newItemData: item } = action.payload;
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
      const { id, itemUpdates } = action.payload;
      const updatedItem = {
        id,
        ...itemUpdates,
      };
      const itemsDict = {
        ...state.itemsDict,
        [id]: inventoryItemViewModelToDto(updatedItem),
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

    case InventoryActionTypes.GET_USED_TAGS_SUCCESS: {
      const { usedTags } = action.payload;

      return {
        ...state,
        usedTags,
      };
    }

    case InventoryActionTypes.FETCH_ITEM_BALANCE_SUCCESS: {
      const {
        id,
        fetchResults: { balance },
      } = action.payload;
      const itemsBalancesDict = {
        ...state.itemsBalancesDict,
        [id]: balance,
      };

      return {
        ...state,
        itemsBalancesDict,
      };
    }

    default:
      return state;
  }
}
