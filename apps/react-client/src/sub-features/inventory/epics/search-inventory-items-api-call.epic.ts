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
    switchMap(([action, authToken]) => {
      const { searchString } = action.payload;

      return searchInventoryItemsApiConnector({ authToken, searchString }).pipe(
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
