import { AllAppActions, RootState } from '..';
import { Epic, ofType } from 'redux-observable';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { match } from 'react-router';
import { SessionActions } from '../actions/session.actions';
import {
  AppRouePaths,
  RegisterEmployeeRouteParams,
} from '../components/app-routes';
import {
  LOCATION_CHANGE,
  LocationChangeAction,
  createMatchSelector,
} from 'connected-react-router';

const registerEmployeeRouteMatchSelector = createMatchSelector<
  RootState,
  RegisterEmployeeRouteParams
>(AppRouePaths.registerEmployee);

export const checkTokenOnNavigationToEmployeeRegistrationPageEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState
> = (action$, state$) => {
  const registerEmployeeRouteMatch$ = state$.pipe(
    map(registerEmployeeRouteMatchSelector),
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
