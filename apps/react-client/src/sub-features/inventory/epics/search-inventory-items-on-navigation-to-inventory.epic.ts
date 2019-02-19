import { AppRouePaths } from '../../../components/app-routes';
import { Epic } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { InventoryActions } from '../actions/inventory.actions';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAllInventoryItems } from '../selectors/all-inventory-items.selector';

/**
 * Fires search inventory items action when user navigates to any inventory route
 * while there is no fetched items in the state store.
 * If you add new inventory routes - then you need to add `startsWith` with those to statement below.
 */
export const searchInventoryItemsOnNavigationToInventory: Epic = (
  action$,
  state$,
) => {
  const allInventoryItems$ = state$.pipe(map(selectAllInventoryItems));

  return action$.pipe(
    ofType(LOCATION_CHANGE),
    withLatestFrom(allInventoryItems$),
    filter(
      ([action, allInventoryItems]) =>
        allInventoryItems.length === 0 &&
        // Add all inventory routes to this statement
        action.payload.location.pathname.startsWith(
          AppRouePaths.inventoryCatalog,
        ),
    ),
    mapTo(InventoryActions.searchItemsStart({})),
  );
};
