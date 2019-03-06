import { AllAppActions, AppEpicsDependencies, RootState } from '..';
import { AllSessionActions, SessionActions } from '../actions/session.actions';
import { EMPTY, fromEvent, Observable, of as observableOf } from 'rxjs';
import { Epic } from 'redux-observable';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectUserIsLoggedIn } from '../selectors/user-is-logged-in.selector';
import {
  SAVED_SESSION_LOCAL_STORAGE_KEY,
  SavedSession,
} from './save-session-to-localstorage-on-login.epic';

/**
 * Logs user in or out on saved in local storage session changes.
 * Is triggered automatically on app startup.
 * ! Note, this epic doesn't track store actions, but listens to browser event.
 */
export const syncAppSessionWithSavedInLocalStorageSessionEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { localStorageService }) => {
  const userIsLoggedIn$ = state$.pipe(map(selectUserIsLoggedIn));

  return fromEvent(window, 'storage').pipe(
    startWith(null),
    withLatestFrom(userIsLoggedIn$),
    switchMap(
      ([, userIsLoggedIn]): Observable<AllSessionActions> => {
        const serializedSessionDataFromLocalStorage = localStorageService.getItem(
          SAVED_SESSION_LOCAL_STORAGE_KEY,
        );
        let sessionDataFromLocalStorage: SavedSession | null = null;

        try {
          sessionDataFromLocalStorage = JSON.parse(
            serializedSessionDataFromLocalStorage || '',
          );
        } catch (e) {}

        const userIsLoggedInAccordingToSavedSessionData =
          !!sessionDataFromLocalStorage &&
          !!sessionDataFromLocalStorage.authToken &&
          Array.isArray(sessionDataFromLocalStorage.userRoles);

        if (userIsLoggedInAccordingToSavedSessionData === userIsLoggedIn) {
          return EMPTY;
        }
        if (!userIsLoggedInAccordingToSavedSessionData) {
          return observableOf(SessionActions.logout());
        }

        // Values are definitely typed (we checked it in `userIsLoggedInAccordingToSavedSessionData`)\
        // Need to use cast because TypeScript can't understand it
        const savedSession = sessionDataFromLocalStorage as SavedSession;
        const emailAccessToken = savedSession.authToken as string;
        const userRoles = savedSession.userRoles;
        const userName = savedSession.userName || '';

        return observableOf(
          SessionActions.emailLoginSuccess({
            emailAccessToken,
            userRoles,
            userName,
          }),
        );
      },
    ),
  );
};
