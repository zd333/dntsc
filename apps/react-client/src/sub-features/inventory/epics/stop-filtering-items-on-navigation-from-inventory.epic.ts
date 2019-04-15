import { AllAppActions } from '../../..';
import { Epic, ofType } from 'redux-observable';
import { filter, mapTo } from 'rxjs/operators';
import { InventoryActions } from '../actions/inventory.actions';
import { inventoryRoutesPaths } from '../../../components/app-routes';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';

/**
 * Dispatches action to disable filtering mode when user leaves an inventory page.
 */
export const stopFilteringItemsOnNavigationFromInventoryEpic: Epic<
  AllAppActions
> = action$ =>
  action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    filter(action =>
      // Check that it is not an inventory path
      inventoryRoutesPaths.every(
        path =>
          !action.payload.location.pathname.toLowerCase().startsWith(path),
      ),
    ),
    mapTo(
      InventoryActions.toggleShowFilteredItemsMode({
        showFilteredItems: false,
      }),
    ),
  );
