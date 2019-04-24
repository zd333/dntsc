import { AllAppActions } from '../../..';
import { appRoutesMatchSelectors } from '../../../selectors/app-routes-match.selector';
import { EmployeesActions } from '../actions/employees.actions';
import { Epic, ofType } from 'redux-observable';
import { filter, map, mapTo, withLatestFrom } from 'rxjs/operators';
import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { selectAllEmployees } from '../selectors/all-employees.selector';

/**
 * Fires fetch employees action when user navigates to employee management page,
 * but only if there are no loaded employees yet.
 */
export const fetchEmployeesOnNvaigationToInventoryManagement: Epic<
  AllAppActions
> = (action$, state$) => {
  const allIEmployees$ = state$.pipe(map(selectAllEmployees));
  const employeeManagementRouteMatch$ = state$.pipe(
    map(appRoutesMatchSelectors.selectEmployeeManagementRouteMatch),
  );

  return action$.pipe(
    ofType<LocationChangeAction>(LOCATION_CHANGE),
    withLatestFrom(allIEmployees$, employeeManagementRouteMatch$),
    filter(
      ([, allIEmployees, employeeManagementRouteMatch]) =>
        (!allIEmployees || allIEmployees.length === 0) &&
        !!employeeManagementRouteMatch,
    ),
    mapTo(EmployeesActions.fetchEmployeesStart()),
  );
};
