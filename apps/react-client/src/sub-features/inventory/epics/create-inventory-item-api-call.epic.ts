import { AppEpicsDependencies, RootState } from '../../..';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { of as observableOf } from 'rxjs';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAuthToken } from '../../../selectors/auth-token.selector';
import {
  AllInventoryActions,
  InventoryActionTypes,
  InventoryActions,
} from '../actions/inventory.actions';

export const createInventoryItemApiCallEpic: Epic<
  AllInventoryActions,
  AllInventoryActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { createInventoryItemApiConnector }) => {
  const authToken$ = state$.pipe(map(selectAuthToken));

  return action$.pipe(
    ofType(InventoryActionTypes.CREATE_ITEM_START),
    withLatestFrom(authToken$),
    switchMap(([action, authToken]) => {
      const { newItemData } = action.payload;

      return createInventoryItemApiConnector({ newItemData, authToken }).pipe(
        map(({ id }) =>
          InventoryActions.createItemSuccess({ id, newItemData }),
        ),
        catchError(error =>
          observableOf(
            InventoryActions.createItemError({ error, newItemData }),
          ),
        ),
      );
    }),
  );
};
