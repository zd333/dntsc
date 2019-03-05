import { Epic } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { InventoryActions } from '../actions/inventory.actions';
import { inventoryRoutesPaths } from '../../../components/app-routes';
import { LOCATION_CHANGE } from 'connected-react-router';
import { ofType } from '@martin_hotell/rex-tils';
import { selectIsItemsDictEmpty } from '../selectors/is-items-distionary-empty.selector';

/**
 * Fires search inventory items action when user navigates to any inventory route,
 * but only if there are no loaded inventory items yet.
 */
export const searchInventoryItemsOnNavigationToInventory: Epic = (
  action$,
  state$,
) => {
  const isItemsDictEmpty$ = state$.pipe(map(selectIsItemsDictEmpty));

  return action$.pipe(
    ofType(LOCATION_CHANGE),
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
