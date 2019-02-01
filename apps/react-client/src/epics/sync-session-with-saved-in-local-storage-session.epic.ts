import { AllSessionActions, SessionActions } from '../actions/session.actions';
import { AppEpicsDependencies, RootState } from '..';
import { EMPTY, fromEvent, Observable, of as observableOf } from 'rxjs';
import { Epic } from 'redux-observable';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { SAVED_SESSION_LOCAL_STORAGE_KEY } from './save-session-to-localstorage-on-login.epic';
import { selectUserIsLoggedIn } from '../selectors/user-is-logged-in.selector';

/**
 * Logs user in or out on saved in local storage session changes.
 * Is triggered automatically on app startup.
 * ! Note, this epic doesn't track store actions, but listens to browser event.
 */
export const syncAppSessionWithSavedInLocalStorageSessionEpic: Epic<
  AllSessionActions,
  AllSessionActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { localStorageService }) => {
  const userIsLoggedIn$ = state$.pipe(map(selectUserIsLoggedIn));

  return fromEvent(window, 'storage').pipe(
    startWith(null),
    withLatestFrom(userIsLoggedIn$),
    switchMap(
      ([, userIsLoggedIn]): Observable<AllSessionActions> => {
        const sessionDataFromLocalStorage = localStorageService.getItem(
          SAVED_SESSION_LOCAL_STORAGE_KEY,
        );
        const userIsLoggedInAccordingToSavedSessionData = !!sessionDataFromLocalStorage;

        return userIsLoggedInAccordingToSavedSessionData === userIsLoggedIn
          ? EMPTY
          : userIsLoggedInAccordingToSavedSessionData
          ? observableOf(
              SessionActions.emailLoginSuccess({
                emailAccessToken: sessionDataFromLocalStorage as string,
              }),
            )
          : observableOf(SessionActions.logout());
      },
    ),
  );
};
