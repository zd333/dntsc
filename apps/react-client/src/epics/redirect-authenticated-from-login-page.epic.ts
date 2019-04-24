import { AllAppActions } from '..';
import { appRoutesMatchSelectors } from '../selectors/app-routes-match.selector';
import { Epic, ofType } from 'redux-observable';
import { filter, map, mapTo, tap, withLatestFrom } from 'rxjs/operators';
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
  const userIsLoggedIn$ = state$.pipe(map(selectUserIsLoggedIn));
  const loginRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectLoginRouteMatch),
  );

  return action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(loginRouteMatch$, userIsLoggedIn$),
    filter(
      ([, loginRouteMatch, userIsLoggedIn]) =>
        !!loginRouteMatch && !!userIsLoggedIn,
    ),
    mapTo(routerActions.push('/')),
  );
};
