import { AllAppActions, AppEpicsDependencies, RootState } from '..';
import { AppLanguages } from '../reducers/session-state.interface';
import { EMPTY, fromEvent, of as observableOf } from 'rxjs';
import { Epic } from 'redux-observable';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { getSavedUserLanguageLocalStorageKey } from './save-last-user-language.epic';
import { selectCurrentUserName } from '../selectors/current-user-name.selector';
import { selectUserIsLoggedIn } from '../selectors/user-is-logged-in.selector';
import { SessionActions } from '../actions/session.actions';

export const syncLanguageWithSavedInLocalStorageEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$) => {
  const userIsLoggedIn$ = state$.pipe(map(selectUserIsLoggedIn));
  const currentUserName$ = state$.pipe(map(selectCurrentUserName));

  return fromEvent<StorageEvent>(window, 'storage').pipe(
    withLatestFrom(userIsLoggedIn$, currentUserName$),
    filter(([, userIsLoggedIn]) => !!userIsLoggedIn),
    switchMap(([storageEvent, , currentUserName]) => {
      const { key: eventKey, newValue } = storageEvent;
      const expectedKey = getSavedUserLanguageLocalStorageKey(currentUserName);

      return eventKey === expectedKey && !!newValue
        ? observableOf(
            SessionActions.changeLanguage({
              language: newValue as AppLanguages,
            }),
          )
        : // Something else but not language is saved to local storage or language was cleared- nothing to dispatch
          EMPTY;
    }),
  );
};
