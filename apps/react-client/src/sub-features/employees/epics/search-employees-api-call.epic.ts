import { AllAppActions, AppEpicsDependencies, RootState } from '../../..';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { createAppEpicErrorAction } from '../../../shared/helpers/create-app-epic-error-action';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { selectAuthToken } from '../../../selectors/auth-token.selector';
import {
  EmployeesActionTypes,
  EmployeesActions,
} from '../actions/employees.actions';

export const searchEmployeesApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { searchEmployeesApiConnector }) => {
  const authToken$ = state$.pipe(map(selectAuthToken));

  return action$.pipe(
    ofType(EmployeesActionTypes.FETCH_EMPLOYEES_START),
    withLatestFrom(authToken$),
    switchMap(([, authToken]) => {
      return searchEmployeesApiConnector({
        authToken,
      }).pipe(
        map(fetchResults =>
          EmployeesActions.fetchEmployeesSuccess({ fetchResults }),
        ),
        catchError(error =>
          createAppEpicErrorAction(
            error,
            EmployeesActions.fetchEmployeesError({ error }),
          ),
        ),
      );
    }),
  );
};
