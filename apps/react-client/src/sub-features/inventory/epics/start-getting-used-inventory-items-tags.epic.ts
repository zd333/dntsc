import { AllAppActions } from '../../..';
import { appRoutesMatchSelectors } from '../../../selectors/app-routes-match.selector';
import { Epic } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ofType } from '@martin_hotell/rex-tils';
import { selectUsedInventoryItemsTags } from '../selectors/used-inventory-items-tags.selector';
import { selectUserIsLoggedIn } from '../../../selectors/user-is-logged-in.selector';
import {
  InventoryActions,
  InventoryActionTypes,
} from '../actions/inventory.actions';

export const startGettingUsedInventoryItemsTagsEpic: Epic<AllAppActions> = (
  action$,
  state$,
) => {
  const userIsLoggedIn$ = state$.pipe(map(selectUserIsLoggedIn));
  const usedInventoryItemsTags$ = state$.pipe(
    map(selectUsedInventoryItemsTags),
  );
  const InventoryCatalogRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectInventoryCatalogRouteMatch),
  );

  return action$.pipe(
    ofType(
      LOCATION_CHANGE,
      InventoryActionTypes.CREATE_ITEM_SUCCESS,
      InventoryActionTypes.UPDATE_ITEM_START,
      InventoryActionTypes.UPDATE_ITEM_ERROR,
    ),
    withLatestFrom(
      userIsLoggedIn$,
      usedInventoryItemsTags$,
      InventoryCatalogRouteMatch$,
    ),
    filter(
      ([
        action,
        userIsLoggedIn,
        usedInventoryItemsTags,
        InventoryCatalogRouteMatch,
      ]) => {
        if (!userIsLoggedIn) {
          // No need to fetch used tags for logged out user
          return false;
        }

        if (action.type === LOCATION_CHANGE) {
          // If it is navigation - then fetch used tags only when destination is relevant page and there are no loaded ones in the state
          return (
            usedInventoryItemsTags.length === 0 &&
            // Add here all routes that need used tags data
            !!InventoryCatalogRouteMatch
          );
        }

        // This is either create or update action, in any case need to re-fetch used tags
        return true;
      },
    ),
    mapTo(InventoryActions.getUsedTagsStart()),
  );
};
