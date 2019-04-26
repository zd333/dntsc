import { AllAppActions } from '../../..';
import { appRoutesMatchSelectors } from '../../../selectors/app-routes-match.selector';
import { Epic, ofType } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { InventoryActions } from '../actions/inventory.actions';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { selectAllItems } from '../selectors/all-items.selector';

/**
 * Fires fetch inventory items action when user navigates to inventory,
 * but only if there are no loaded inventory items yet.
 */
export const fetchInventoryItemsOnNavigationToInventoryEpic: Epic<
  AllAppActions
> = (action$, state$) => {
  const allItems$ = state$.pipe(map(selectAllItems));
  const inventoryCatalogRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectInventoryCatalogRouteMatch),
  );
  const inventoryBalanceRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectInventoryBalanceRouteMatch),
  );

  return action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(
      inventoryCatalogRouteMatch$,
      inventoryBalanceRouteMatch$,
      allItems$,
    ),
    filter(
      ([, inventoryCatalogRouteMatch, inventoryBalanceRouteMatch, allItems]) =>
        (!!inventoryCatalogRouteMatch || !!inventoryBalanceRouteMatch) &&
        (!allItems || allItems.length === 0),
    ),
    mapTo(InventoryActions.fetchItemsStart({})),
  );
};
