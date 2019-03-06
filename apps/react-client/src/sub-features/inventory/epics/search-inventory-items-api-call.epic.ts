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
    ofType(InventoryActionTypes.SEARCH_ITEMS_START),
    withLatestFrom(authToken$),
    debounceTime(DEBOUNCE_TIME),
    switchMap(([action, authToken]) => {
      const { searchString } = action.payload;

      return searchInventoryItemsApiConnector({ searchString, authToken }).pipe(
        map(searchResults =>
          InventoryActions.searchItemsSuccess({ searchResults }),
        ),
        catchError(error =>
          createAppEpicErrorAction(
            error,
            InventoryActions.searchItemsError({ error }),
          ),
        ),
      );
    }),
  );
};
