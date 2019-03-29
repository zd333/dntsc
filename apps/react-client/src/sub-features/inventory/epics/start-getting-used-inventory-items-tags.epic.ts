import { AllAppActions } from '../../..';
import { AppRouePaths } from '../../../components/app-routes';
import { Epic } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ofType } from '@martin_hotell/rex-tils';
import { selectRoutePath } from '../../../selectors/route-path.selector';
import { selectUsedInventoryItemsTags } from '../selectors/used-inventory-items-tags.selector';
import { selectUserIsLoggedIn } from '../../../selectors/user-is-logged-in.selector';
import {
  InventoryActions,
  InventoryActionTypes,
} from '../actions/inventory.actions';

export const startGettingUsedInventoryItemsTags: Epic<AllAppActions> = (
  action$,
  state$,
) => {
  const userIsLoggedIn$ = state$.pipe(map(selectUserIsLoggedIn));
  const usedInventoryItemsTags$ = state$.pipe(
    map(selectUsedInventoryItemsTags),
  );
  const routePath$ = state$.pipe(map(selectRoutePath));

  return action$.pipe(
    ofType(
      LOCATION_CHANGE,
      InventoryActionTypes.CREATE_ITEM_SUCCESS,
      InventoryActionTypes.UPDATE_ITEM_START,
      InventoryActionTypes.UPDATE_ITEM_ERROR,
    ),
    withLatestFrom(userIsLoggedIn$, usedInventoryItemsTags$, routePath$),
    filter(([action, userIsLoggedIn, usedInventoryItemsTags, routePath]) => {
      if (!userIsLoggedIn) {
        // No need to fetch used tags for logged out user
        return false;
      }

      if (action.type === LOCATION_CHANGE) {
        // If it is navigation - then fetch used tags only when destination is relevant page and there are no loaded ones in the state
        return (
          usedInventoryItemsTags.length === 0 &&
          // Add here all routes that need used tags data
          routePath.startsWith(AppRouePaths.inventoryCatalog)
        );
      }

      // This is either create or update action, in any case need to re-fetch used tags
      return true;
    }),
    mapTo(InventoryActions.getUsedTagsStart()),
  );
};
