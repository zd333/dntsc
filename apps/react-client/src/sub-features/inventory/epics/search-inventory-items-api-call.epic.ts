import { AppEpicsDependencies, RootState } from '../../..';
import { Epic } from 'redux-observable';
import { of as observableOf } from 'rxjs';
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
  AllInventoryActions,
  InventoryActionTypes,
  InventoryActions,
} from '../actions/inventory.actions';

const DEBOUNCE_TIME = 1000;

export const searchInventoryItemsApiCallEpic: Epic<
  AllInventoryActions,
  AllInventoryActions,
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
          observableOf(InventoryActions.searchItemsError({ error })),
        ),
      );
    }),
  );
};
