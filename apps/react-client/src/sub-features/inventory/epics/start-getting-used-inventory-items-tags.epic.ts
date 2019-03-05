import { Epic } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ofType } from '@martin_hotell/rex-tils';
import { selectUsedInventoryItemsTags } from '../selectors/used-inventory-items-tags.selector';
import {
  InventoryActions,
  InventoryActionTypes,
} from '../actions/inventory.actions';

/**
 * Dispatches `GET_USED_TAGS_START` action when there are no used tags in the state on next events:
 * * navigation to any inventory route
 * * new items was successfully added
 * * item was updated (both success and error cases)
 */
export const startGettingUsedInventoryItemsTags: Epic = (action$, state$) => {
  const usedInventoryItemsTags$ = state$.pipe(
    map(selectUsedInventoryItemsTags),
  );

  return action$.pipe(
    ofType(
      LOCATION_CHANGE,
      InventoryActionTypes.CREATE_ITEM_SUCCESS,
      InventoryActionTypes.UPDATE_ITEM_START,
      InventoryActionTypes.UPDATE_ITEM_ERROR,
    ),
    withLatestFrom(usedInventoryItemsTags$),
    filter(([, uedInventoryItemsTags]) => uedInventoryItemsTags.length === 0),
    mapTo(InventoryActions.getUsedTagsStart()),
  );
};
