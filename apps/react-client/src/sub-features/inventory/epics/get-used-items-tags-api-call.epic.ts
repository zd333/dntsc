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

export const getUsedItemsTagsApiCallEpic: Epic<
  AllInventoryActions,
  AllInventoryActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { getUsedInInventoryItemsTagsApiConnector }) => {
  const authToken$ = state$.pipe(map(selectAuthToken));

  return action$.pipe(
    ofType(InventoryActionTypes.GET_USED_TAGS_START),
    withLatestFrom(authToken$),
    switchMap(([, authToken]) =>
      getUsedInInventoryItemsTagsApiConnector({ authToken }).pipe(
        map(usedTags => InventoryActions.getUsedTagsSuccess({ usedTags })),
        catchError(error =>
          observableOf(InventoryActions.getUsedTagsError({ error })),
        ),
      ),
    ),
  );
};
