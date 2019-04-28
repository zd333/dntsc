import { AllAppActions } from '../../..';
import { Epic, ofType } from 'redux-observable';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectAllItems } from '../selectors/all-items.selector';
import {
  InventoryActions,
  InventoryActionTypes,
} from '../actions/inventory.actions';

/**
 * Fires multiple fetch inventory item balance actions when items in the store are updated,
 * Action is dispatched for each inventory item in the store which has no balance info.
 */
export const fetchBalancesOnInventoryItemsUpdatesEpic: Epic<AllAppActions> = (
  action$,
  state$,
) => {
  const allInventoryItems$ = state$.pipe(map(selectAllItems));

  return action$.pipe(
    ofType(
      InventoryActionTypes.FETCH_ITEMS_SUCCESS,
      InventoryActionTypes.FETCH_AND_FILTER_ITEMS_SUCCESS,
    ),
    withLatestFrom(allInventoryItems$),
    switchMap(([, allInventoryItems]) =>
      allInventoryItems
        .filter(inventoryItem => typeof inventoryItem.balance === 'undefined')
        .map(inventoryItemWithMissingBalance =>
          InventoryActions.fetchItemBalanceStart({
            id: inventoryItemWithMissingBalance.id,
          }),
        ),
    ),
  );
};
