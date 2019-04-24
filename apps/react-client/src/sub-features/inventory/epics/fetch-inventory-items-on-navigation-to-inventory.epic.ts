import { AllAppActions } from '../../..';
import { appRoutesMatchSelectors } from '../../../selectors/app-routes-match.selector';
import { Epic, ofType } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { InventoryActions } from '../actions/inventory.actions';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { selectAllItems } from '../selectors/all-items.selector';

/**
 * Fires fetch inventory items action when user navigates to inventory route,
 * but only if there are no loaded inventory items yet.
 */
export const searchInventoryItemsOnNavigationToInventoryEpic: Epic<
  AllAppActions
> = (action$, state$) => {
  const allItems$ = state$.pipe(map(selectAllItems));
  const inventoryCatalogRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectInventoryCatalogRouteMatch),
  );

  return action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(inventoryCatalogRouteMatch$, allItems$),
    filter(
      ([, inventoryCatalogRouteMatch, allItems]) =>
        !!inventoryCatalogRouteMatch && (!allItems || allItems.length === 0),
    ),
    mapTo(InventoryActions.fetchItemsStart({})),
  );
};
