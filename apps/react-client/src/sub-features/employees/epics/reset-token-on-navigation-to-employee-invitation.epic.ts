import { AllAppActions } from '../../..';
import { AppRouePaths } from '../../../components/app-routes';
import { EmployeesActions } from '../actions/employees.actions';
import { Epic, ofType } from 'redux-observable';
import { filter, mapTo } from 'rxjs/operators';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';

export const resetTokenOnNavigationToEmployeeInvitationEpic: Epic<
  AllAppActions
> = action$ =>
  action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    filter(action =>
      action.payload.location.pathname
        .toLowerCase()
        .startsWith(AppRouePaths.employeeInvitation),
    ),
    mapTo(EmployeesActions.resetEmployeeRegistrationToken()),
  );
