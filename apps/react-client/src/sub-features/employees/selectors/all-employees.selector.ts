import { createSelector } from 'reselect';
import { EmployeeVM } from '../components/EmployeeListItem';
import { selectEmployeesState } from './eployees-state.selector';

/**
 * Returns array of all available employee view models.
 * Since VM and raw model are the same - no raw model dictionary + VM dictionary are needed.
 */
export const selectAllEmployees = createSelector(
  [selectEmployeesState],
  employeesState => {
    if (!employeesState || !employeesState.employeesDict) {
      return [];
    }

    return Object.getOwnPropertyNames(employeesState.employeesDict)
      .map(propName => employeesState.employeesDict[propName] as EmployeeVM)
      .filter(item => !!item);
  },
);
