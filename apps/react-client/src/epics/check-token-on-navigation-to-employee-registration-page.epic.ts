import { AllAppActions, RootState } from '..';
import { appRoutesMatchSelectors } from '../selectors/app-routes-match.selector';
import { Epic, ofType } from 'redux-observable';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { match } from 'react-router';
import { RegisterEmployeeRouteParams } from '../components/app-routes';
import { SessionActions } from '../actions/session.actions';

export const checkTokenOnNavigationToEmployeeRegistrationPageEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState
> = (action$, state$) => {
  const registerEmployeeRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectRegisterEmployeeRouteMatch),
  );

  return action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(registerEmployeeRouteMatch$),
    filter(([, registerEmployeeRouteMatch]) => !!registerEmployeeRouteMatch),
    map(([, registerEmployeeRouteMatch]) =>
      SessionActions.checkEmployeeRegistrationTokenStart({
        // `registerEmployeeRouteMatch` is definitely not null due to `filter` statement above
        registrationToken: (registerEmployeeRouteMatch as match<
          RegisterEmployeeRouteParams
        >).params.registrationToken,
      }),
    ),
  );
};
