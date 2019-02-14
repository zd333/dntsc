import { AppRouePaths } from '../components/app-routes';
import { Epic } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { LOCATION_CHANGE, routerActions } from 'connected-react-router';
import { ofType } from '@martin_hotell/rex-tils';
import { selectUserIsLoggedIn } from '../../src/selectors/user-is-logged-in.selector';

/**
 * Redirects logged in user to home page on navigation attempt to login page.
 */
export const redirectAuthenticatedFromLoginPageEpic: Epic = (
  action$,
  state$,
) => {
  const userIsLoggedIn$ = state$.pipe(map(selectUserIsLoggedIn));

  return action$.pipe(
    // TODO: test if this catches router actions
    ofType(LOCATION_CHANGE),
    withLatestFrom(userIsLoggedIn$),
    filter(
      ([action, userIsLoggedIn]) =>
        userIsLoggedIn &&
        action.payload.location.pathname.startsWith(AppRouePaths.login),
    ),
    mapTo(routerActions.push('/')),
  );
};
