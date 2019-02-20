import { AppRouePaths } from '../components/app-routes';
import { Epic } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { LOCATION_CHANGE, routerActions } from 'connected-react-router';
import { ofType } from '@martin_hotell/rex-tils';
import { selectUserIsLoggedIn } from '../../src/selectors/user-is-logged-in.selector';

/**
 * Redirects user to login page on navigation attempt when:
 * * user is not logged in
 * * navigation is not to login page
 */
export const redirectUnauthenticatedToLoginPageEpic: Epic = (
  action$,
  state$,
) => {
  const userIsLoggedIn$ = state$.pipe(
    map(selectUserIsLoggedIn),
    // Undefined means still unknown, wait for it is known if logged in or not
    filter(userIsLoggedIn => typeof userIsLoggedIn !== 'undefined'),
  );

  return action$.pipe(
    ofType(LOCATION_CHANGE),
    withLatestFrom(userIsLoggedIn$),
    filter(
      ([action, userIsLoggedIn]) =>
        !userIsLoggedIn &&
        !action.payload.location.pathname.startsWith(AppRouePaths.login),
    ),
    mapTo(routerActions.push(AppRouePaths.login)),
  );
};
