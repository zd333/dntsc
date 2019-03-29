import { AllAppActions } from '../../..';
import { Epic, ofType } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { InventoryActions } from '../actions/inventory.actions';
import { inventoryRoutesPaths } from '../../../components/app-routes';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { selectAllItems } from '../selectors/all-items.selector';

/**
 * Fires fetch inventory items action when user navigates to any inventory route,
 * but only if there are no loaded inventory items yet.
 */
export const searchInventoryItemsOnNavigationToInventory: Epic<
  AllAppActions
> = (action$, state$) => {
  const allItems$ = state$.pipe(map(selectAllItems));

  return action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(allItems$),
    filter(
      ([action, allItems]) =>
        (!allItems || allItems.length === 0) &&
        inventoryRoutesPaths.some(path =>
          action.payload.location.pathname.toLowerCase().startsWith(path),
        ),
    ),
    mapTo(InventoryActions.fetchItemsStart({})),
  );
};
