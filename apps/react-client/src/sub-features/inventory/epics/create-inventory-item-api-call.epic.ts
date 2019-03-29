import { AllAppActions, AppEpicsDependencies, RootState } from '../../..';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { createAppEpicErrorAction } from '../../../shared/helpers/create-app-epic-error-action';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAuthToken } from '../../../selectors/auth-token.selector';
import {
  InventoryActionTypes,
  InventoryActions,
} from '../actions/inventory.actions';

export const createInventoryItemApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
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
          createAppEpicErrorAction(
            error,
            InventoryActions.createItemError({ error, newItemData }),
          ),
        ),
      );
    }),
  );
};
