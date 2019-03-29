import { AllAppActions, AppEpicsDependencies, RootState } from '../../..';
import { createAppEpicErrorAction } from '../../../shared/helpers/create-app-epic-error-action';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAuthToken } from '../../../selectors/auth-token.selector';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  debounceTime,
} from 'rxjs/operators';
import {
  InventoryActionTypes,
  InventoryActions,
} from '../actions/inventory.actions';

const DEBOUNCE_TIME = 1000;

export const searchInventoryItemsApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { searchInventoryItemsApiConnector }) => {
  const authToken$ = state$.pipe(map(selectAuthToken));

  return action$.pipe(
    ofType(
      InventoryActionTypes.FETCH_ITEMS_START,
      InventoryActionTypes.FETCH_AND_FILTER_ITEMS_START,
    ),
    withLatestFrom(authToken$),
    debounceTime(DEBOUNCE_TIME),
    switchMap(([action, authToken]) => {
      // Action params for fetch and filter are expected to be `searchString`, `tagsToFilterBy` and `alternatesOf`
      const actionParams =
        action.type === InventoryActionTypes.FETCH_AND_FILTER_ITEMS_START
          ? action.payload
          : {};

      return searchInventoryItemsApiConnector({
        ...actionParams,
        authToken,
      }).pipe(
        map(fetchResults =>
          action.type === InventoryActionTypes.FETCH_ITEMS_START
            ? InventoryActions.fetchItemsSuccess({ fetchResults })
            : InventoryActions.fetchAndFilterItemsSuccess({
                searchResults: fetchResults,
              }),
        ),
        catchError(error =>
          createAppEpicErrorAction(
            error,
            InventoryActions.fetchAndFilterItemsError({ error }),
          ),
        ),
      );
    }),
  );
};
