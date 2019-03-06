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

export const getUsedItemsTagsApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
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
          createAppEpicErrorAction(
            error,
            InventoryActions.getUsedTagsError({ error }),
          ),
        ),
      ),
    ),
  );
};
