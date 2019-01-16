import { Epic } from 'redux-observable';
import {
  filter,
  map,
  mapTo,
  withLatestFrom
} from 'rxjs/operators';
import { selectUserIsLoggedIn } from 'src/selectors/user-is-logged-in.selector';
import {
  LOCATION_CHANGE,
  routerActions,
} from 'connected-react-router';
import { ofType } from '@martin_hotell/rex-tils';

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
    ofType(LOCATION_CHANGE),
    withLatestFrom(userIsLoggedIn$),
    filter(
      ([action, userIsLoggedIn]) =>
        !userIsLoggedIn &&
        !action.payload.location.pathname.startsWith('/login'),
    ),
    mapTo(routerActions.push('/login')),
  );
};
