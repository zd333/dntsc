import { AllAppActions, AppEpicsDependencies, RootState } from '..';
import { EMPTY } from 'rxjs';
import { Epic } from 'redux-observable';
import { filter, map, switchMapTo, tap, withLatestFrom } from 'rxjs/operators';
import { ofType } from '@martin_hotell/rex-tils';
import { selectCurrentUserName } from '../selectors/current-user-name.selector';
import { selectUserIsLoggedIn } from '../selectors/user-is-logged-in.selector';
import { SessionActionTypes } from '../actions/session.actions';

const SAVED_USER_LANGUAGE_LOCAL_STORAGE_KEY_PREFIX = 'usr_lng';
export const getSavedUserLanguageLocalStorageKey = (userName: string) =>
  `${SAVED_USER_LANGUAGE_LOCAL_STORAGE_KEY_PREFIX}-${userName}`;

/**
 * Saves app language of logged in user after language is changed.
 * Works similar to `saveSessionToLocalStorageOnLoginEpic`, but is dedicated because
 * is saved per user.
 * Target user is identified by username which is part of storage key.
 */
export const saveLastUserLanguageEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { localStorageService }) => {
  const userIsLoggedIn$ = state$.pipe(map(selectUserIsLoggedIn));
  const currentUserName$ = state$.pipe(map(selectCurrentUserName));

  return action$.pipe(
    ofType(SessionActionTypes.CHANGE_LANGUAGE),
    withLatestFrom(userIsLoggedIn$, currentUserName$),
    filter(([, userIsLoggedIn]) => !!userIsLoggedIn),
    tap(([action, , currentUserName]) => {
      const key = getSavedUserLanguageLocalStorageKey(currentUserName);
      const { language } = action.payload;

      localStorageService.setItem(key, language);
    }),
    // Nothing to dispatch
    switchMapTo(EMPTY),
  );
};
