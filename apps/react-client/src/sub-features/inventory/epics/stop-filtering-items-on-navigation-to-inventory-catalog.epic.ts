import { AllAppActions } from '../../..';
import { AppRouePaths } from '../../../components/app-routes';
import { Epic, ofType } from 'redux-observable';
import { filter, mapTo } from 'rxjs/operators';
import { InventoryActions } from '../actions/inventory.actions';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';

/**
 * Dispatches action to disable filtering mode when user arrives at inventory catalog page.
 * This resets all filtering settings from previous user visit of this route.
 */
export const stopFilteringItemsOnNavigationToInventoryCatalogEpic: Epic<
  AllAppActions
> = action$ =>
  action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    filter(action =>
      action.payload.location.pathname
        .toLowerCase()
        .startsWith(AppRouePaths.inventoryCatalog),
    ),
    mapTo(
      InventoryActions.toggleShowFilteredItemsMode({
        showFilteredItems: false,
      }),
    ),
  );
