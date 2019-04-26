import { AllAppActions, AppEpicsDependencies, RootState } from '../../..';
import { createAppEpicErrorAction } from '../../../shared/helpers/create-app-epic-error-action';
import { EMPTY } from 'rxjs';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAuthToken } from '../../../selectors/auth-token.selector';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  switchMapTo,
} from 'rxjs/operators';
import {
  InventoryActionTypes,
  InventoryActions,
} from '../actions/inventory.actions';

export const changeItemBalanceApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { createInventoryItemBalanceChangeApiConnector }) => {
  const authToken$ = state$.pipe(map(selectAuthToken));

  return action$.pipe(
    ofType(InventoryActionTypes.CHANGE_ITEM_BALANCE_START),
    withLatestFrom(authToken$),
    switchMap(([action, authToken]) => {
      const { id, balanceChangeValue, comment } = action.payload;

      return createInventoryItemBalanceChangeApiConnector({
        itemId: id,
        amount: balanceChangeValue,
        comment,
        authToken,
      }).pipe(
        switchMapTo(EMPTY),
        catchError(error =>
          createAppEpicErrorAction(
            error,
            InventoryActions.changeItemBalanceError({
              error,
              id,
              failedToProcessBalanceChangeValue: balanceChangeValue,
            }),
          ),
        ),
      );
    }),
  );
};
