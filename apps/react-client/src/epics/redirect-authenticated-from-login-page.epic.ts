import { AllAppActions } from '..';
import { AppRouePaths } from '../components/app-routes';
import { Epic, ofType } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { selectUserIsLoggedIn } from '../../src/selectors/user-is-logged-in.selector';
import {
  LOCATION_CHANGE,
  routerActions,
  LocationChangeAction,
} from 'connected-react-router';

/**
 * Redirects logged in user to home page on navigation attempt to login page.
 */
export const redirectAuthenticatedFromLoginPageEpic: Epic<AllAppActions> = (
  action$,
  state$,
) => {
  const userIsLoggedIn$ = state$.pipe(
    map(selectUserIsLoggedIn),
    // Undefined means still unknown, wait for it is known if logged in or not
    filter(userIsLoggedIn => typeof userIsLoggedIn !== 'undefined'),
  );

  return action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(userIsLoggedIn$),
    filter(
      ([action, userIsLoggedIn]) =>
        !!userIsLoggedIn &&
        action.payload.location.pathname.startsWith(AppRouePaths.login),
    ),
    mapTo(routerActions.push('/')),
  );
};
