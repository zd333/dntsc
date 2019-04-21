import { connect } from 'react-redux';
import { EmployeesActions } from '../actions/employees.actions';
import { RootState } from '../../..';
import { selectAllEmployees } from '../selectors/all-employees.selector';
import { selectRolesAllowedToOperateWith } from '../selectors/roles-allowed-to-operate-with.selector';
import {
  EmployeeListPageProps,
  EmployeeListPage,
} from '../components/EmployeeListPage';

import {
  StateMapper,
  DispatchMapper,
} from '../../../shared/types/container-state-mapper.interface';

const mapStateToProps: StateMapper<
  EmployeeListPageProps,
  RootState
> = state => {
  return {
    employees: selectAllEmployees(state),
    availableRoles: selectRolesAllowedToOperateWith(state),
  };
};

const mapDispatchToProps: DispatchMapper<EmployeeListPageProps> = dispatch => {
  return {
    onEmployeeChanges: params => {
      dispatch(
        EmployeesActions.updateEmployeeStart({
          updatedEmployee: params.updatedEmployee,
          originalEmployee: params.originalEmployee,
        }),
      );
    },
  };
};

export const EmployeeListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeListPage);
