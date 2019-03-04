import { Epic } from 'redux-observable';
import { filter, mapTo } from 'rxjs/operators';
import { InventoryActions } from '../actions/inventory.actions';
import { inventoryRoutesPaths } from '../../../components/app-routes';
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
      inventoryRoutesPaths.some(path =>
        action.payload.location.pathname.toLowerCase().startsWith(path),
      ),
    ),
    // TODO: this should be done only when dict is empty
    mapTo(InventoryActions.searchItemsStart({})),
  );
