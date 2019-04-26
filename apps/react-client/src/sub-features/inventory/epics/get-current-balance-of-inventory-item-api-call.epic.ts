import { AllAppActions, AppEpicsDependencies, RootState } from '../../..';
import { Epic } from 'redux-observable';
import { of as observableOf, race } from 'rxjs';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAuthToken } from '../../../selectors/auth-token.selector';
import {
  catchError,
  map,
  mergeMap,
  withLatestFrom,
  filter,
  take,
  takeUntil,
} from 'rxjs/operators';
import {
  InventoryActionTypes,
  InventoryActions,
} from '../actions/inventory.actions';

export const getCurrentBalanceOfInventoryItemApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { getCurrentBalanceOfInventoryItemApiConnector }) => {
  const authToken$ = state$.pipe(map(selectAuthToken));

  return action$.pipe(
    ofType(InventoryActionTypes.FETCH_ITEM_BALANCE_START),
    withLatestFrom(authToken$),
    // Notice `mergeMap`, we have to use it to have multiple requests of different items (with different id)
    mergeMap(([action, authToken]) => {
      const { id } = action.payload;
      // Next request of same item (with same id)
      const fetchBalanceOfSameItemAction$ = action$.pipe(
        ofType(InventoryActionTypes.FETCH_ITEM_BALANCE_START),
        filter(nextAction => nextAction.payload.id === id),
      );
      const changeBalanceOfSameItemAction$ = action$.pipe(
        ofType(InventoryActionTypes.CHANGE_ITEM_BALANCE_START),
        filter(nextAction => nextAction.payload.id === id),
      );
      const pendingRequestShouldBeCancelled$ = race([
        fetchBalanceOfSameItemAction$,
        changeBalanceOfSameItemAction$,
      ]).pipe(take(1));

      return getCurrentBalanceOfInventoryItemApiConnector({
        id,
        authToken,
      }).pipe(
        map(dto =>
          InventoryActions.fetchItemBalanceSuccess({
            id,
            itemBalance: dto.balance,
          }),
        ),
        // Do not use `createCommonErrorAction`, simply ignore error for now
        catchError(error =>
          observableOf(InventoryActions.fetchItemBalanceError({ error })),
        ),
        takeUntil(pendingRequestShouldBeCancelled$),
      );
    }),
  );
};
