import { AppRouePaths } from '../components/app-routes';
import { appRoutesMatchSelectors } from '../selectors/app-routes-match.selector';
import { Epic, ofType } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { selectUserIsLoggedIn } from '../../src/selectors/user-is-logged-in.selector';
import {
  LOCATION_CHANGE,
  routerActions,
  LocationChangeAction,
} from 'connected-react-router';

/**
 * Redirects user to login page on navigation attempt when:
 * * user is not logged in
 * * navigation is not to login page
 */
export const redirectUnauthenticatedToLoginPageEpic: Epic = (
  action$,
  state$,
) => {
  const userIsLoggedIn$ = state$.pipe(map(selectUserIsLoggedIn));
  const loginRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectLoginRouteMatch),
  );
  const registerEmployeeRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectRegisterEmployeeRouteMatch),
  );

  return action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(
      loginRouteMatch$,
      registerEmployeeRouteMatch$,
      userIsLoggedIn$,
    ),
    filter(
      ([, loginRouteMatch, registerEmployeeRouteMatch, userIsLoggedIn]) =>
        !loginRouteMatch &&
        !registerEmployeeRouteMatch &&
        // Ignore undefined (it means still unknown if logged in or not)
        userIsLoggedIn === false,
    ),
    mapTo(routerActions.push(AppRouePaths.login)),
  );
};
