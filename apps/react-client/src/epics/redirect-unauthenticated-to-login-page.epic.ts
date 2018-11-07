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
 * Redirects user to login page on navigation attempt when:
 * * user is not logged in
 * * navigation is not to login page
 */
export const redirectUnauthenticatedToLoginPageEpic: Epic = (
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
        !userIsLoggedIn &&
        !action.payload.location.pathname.startsWith('/login'),
    ),
    mapTo(routerActions.push('/login')),
  );
};
