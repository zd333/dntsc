import { AllAppActions, AppEpicsDependencies, RootState } from '../../..';
import { createAppEpicErrorAction } from '../../../shared/helpers/create-app-epic-error-action';
import { EMPTY } from 'rxjs';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAllItemsDict } from '../selectors/all-items-dictionary.selector';
import { selectAuthToken } from '../../../selectors/auth-token.selector';
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
  const allItemsDict$ = state$.pipe(map(selectAllItemsDict));

  return action$.pipe(
    ofType(InventoryActionTypes.UPDATE_ITEM_START),
    withLatestFrom(allItemsDict$, authToken$),
    switchMap(([action, allItemsDict, authToken]) => {
      const { id, itemUpdates } = action.payload;
      const originalItem = allItemsDict[id];

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
