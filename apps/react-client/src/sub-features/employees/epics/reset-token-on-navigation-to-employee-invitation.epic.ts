import { AllAppActions } from '../../..';
import { AppRouePaths } from '../../../components/AppRoutes';
import { appRoutesMatchSelectors } from '../../../selectors/app-routes-match.selector';
import { EmployeesActions } from '../actions/employees.actions';
import { Epic, ofType } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';

export const resetTokenOnNavigationToEmployeeInvitationEpic: Epic<
  AllAppActions
> = (action$, state$) => {
  const employeeInvitationRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectEmployeeInvitationRouteMatch),
  );

  return action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(employeeInvitationRouteMatch$),
    filter(
      ([, employeeInvitationRouteMatch]) => !!employeeInvitationRouteMatch,
    ),
    mapTo(EmployeesActions.resetEmployeeRegistrationToken()),
  );
};
