import { AllAppActions, AppEpicsDependencies, RootState } from '../../..';
import { createAppEpicErrorAction } from '../../../shared/helpers/create-app-epic-error-action';
import { EMPTY } from 'rxjs';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAuthToken } from '../../../selectors/auth-token.selector';
import { selectRawItemsDict } from '../selectors/raw-items-dictionary.selector';
import {
  catchError,
  map,
  switchMapTo,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  InventoryActionTypes,
  InventoryActions,
} from '../actions/inventory.actions';

export const updateInventoryItemApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { updateInventoryItemApiConnector }) => {
  const authToken$ = state$.pipe(map(selectAuthToken));
  const rawItemsDict$ = state$.pipe(map(selectRawItemsDict));

  return action$.pipe(
    ofType(InventoryActionTypes.UPDATE_ITEM_START),
    withLatestFrom(rawItemsDict$, authToken$),
    switchMap(([action, rawItemsDict, authToken]) => {
      const { id, itemUpdates } = action.payload;
      const originalItem = rawItemsDict[id];

      return updateInventoryItemApiConnector({
        id,
        itemUpdates,
        authToken,
      }).pipe(
        switchMapTo(EMPTY),
        catchError(error =>
          createAppEpicErrorAction(
            error,
            InventoryActions.updateItemError({ originalItem, error }),
          ),
        ),
      );
    }),
  );
};
