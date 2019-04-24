import { AllAppActions, AppEpicsDependencies, RootState } from '../../..';
import { createAppEpicErrorAction } from '../../../shared/helpers/create-app-epic-error-action';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAuthToken } from '../../../selectors/auth-token.selector';
import {
  catchError,
  map,
  mapTo,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  EmployeesActionTypes,
  EmployeesActions,
} from '../actions/employees.actions';

export const updateEmployeeApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { updateEmployeeApiConnector }) => {
  const authToken$ = state$.pipe(map(selectAuthToken));

  return action$.pipe(
    ofType(EmployeesActionTypes.UPDATE_EMPLOYEE_START),
    withLatestFrom(authToken$),
    switchMap(([action, authToken]) => {
      const { updatedEmployee, originalEmployee } = action.payload;
      const { id, ...employeeUpdates } = updatedEmployee;

      return updateEmployeeApiConnector({
        authToken,
        id,
        employeeUpdates,
      }).pipe(
        mapTo(EmployeesActions.updateEmployeeSuccess()),
        catchError(error =>
          createAppEpicErrorAction(
            error,
            EmployeesActions.updateEmployeeError({ error, originalEmployee }),
          ),
        ),
      );
    }),
  );
};
