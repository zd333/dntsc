import { AllAppActions } from '../../..';
import { appRoutesMatchSelectors } from '../../../selectors/app-routes-match.selector';
import { Epic, ofType } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { InventoryActions } from '../actions/inventory.actions';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';

/**
 * Dispatches action to disable filtering mode when user arrives at inventory catalog page.
 * This resets all filtering settings from previous user visit of this route.
 */
export const stopFilteringItemsOnNavigationToInventoryCatalogEpic: Epic = (
  action$,
  state$,
) => {
  const inventoryCatalogRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectInventoryCatalogRouteMatch),
  );

  return action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(inventoryCatalogRouteMatch$),
    filter(([, inventoryCatalogRouteMatch]) => !!inventoryCatalogRouteMatch),
    mapTo(
      InventoryActions.toggleShowFilteredItemsMode({
        showFilteredItems: false,
      }),
    ),
  );
};
