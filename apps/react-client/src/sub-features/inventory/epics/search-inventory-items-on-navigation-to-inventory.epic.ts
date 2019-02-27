import { AppRouePaths } from '../../../components/app-routes';
import { Epic } from 'redux-observable';
import { filter, mapTo } from 'rxjs/operators';
import { InventoryActions } from '../actions/inventory.actions';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ofType } from '@martin_hotell/rex-tils';

/**
 * Fires search inventory items action when user navigates to any inventory route.
 * If you add new inventory routes - then you need to add `startsWith` with those to statement below.
 */
export const searchInventoryItemsOnNavigationToInventory: Epic = action$ =>
  action$.pipe(
    ofType(LOCATION_CHANGE),
    filter(action =>
      action.payload.location.pathname.startsWith(
        // Add all inventory routes to this statement
        AppRouePaths.inventoryCatalog,
      ),
    ),
    mapTo(InventoryActions.searchItemsStart({})),
  );
