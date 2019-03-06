import { AllAppActions } from '../../..';
import { Epic, ofType } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { InventoryActions } from '../actions/inventory.actions';
import { inventoryRoutesPaths } from '../../../components/app-routes';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { selectIsItemsDictEmpty } from '../selectors/is-items-distionary-empty.selector';

/**
 * Fires search inventory items action when user navigates to any inventory route,
 * but only if there are no loaded inventory items yet.
 */
export const searchInventoryItemsOnNavigationToInventory: Epic<
  AllAppActions
> = (action$, state$) => {
  const isItemsDictEmpty$ = state$.pipe(map(selectIsItemsDictEmpty));

  return action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(isItemsDictEmpty$),
    filter(
      ([action, isItemsDictEmpty]) =>
        isItemsDictEmpty &&
        inventoryRoutesPaths.some(path =>
          action.payload.location.pathname.toLowerCase().startsWith(path),
        ),
    ),
    mapTo(InventoryActions.searchItemsStart({})),
  );
};
