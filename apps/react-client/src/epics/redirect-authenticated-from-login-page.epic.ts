import { Epic, ofType } from 'redux-observable';
import {
  filter,
  map,
  mapTo,
  withLatestFrom
  } from 'rxjs/operators';
import { selectUserIsLoggedIn } from 'src/selectors/user-is-logged-in.selector';
import {
  LOCATION_CHANGE,
  LocationChangeAction,
  routerActions,
} from 'connected-react-router';

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
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(userIsLoggedIn$),
    filter(
      ([action, userIsLoggedIn]) =>
        userIsLoggedIn && action.payload.location.pathname.startsWith('/login'),
    ),
    mapTo(routerActions.push('/')),
  );
};
