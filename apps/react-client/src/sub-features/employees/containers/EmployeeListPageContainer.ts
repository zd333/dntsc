import { connect } from 'react-redux';
import { EmployeesActions } from '../actions/employees.actions';
import { RootState } from '../../..';
import { selectAllEmployees } from '../selectors/all-employees.selector';
import { selectCurrentUserIsPlatformOwner } from '../../../selectors/current-user-is-platform-owner.selector';
import { selectRolesAllowedToOperateWith } from '../selectors/roles-allowed-to-operate-with.selector';
import {
  EmployeeListPageProps,
  EmployeeListPage,
} from '../components/EmployeeListPage';

import {
  StateToComponentNonFunctionPropsMapper,
  DispatchToComponentFunctionPropsMapper,
} from '../../../shared/types/container-state-mapper.interface';

const mapStateToProps: StateToComponentNonFunctionPropsMapper<
  EmployeeListPageProps,
  RootState
> = state => {
  return {
    employees: selectAllEmployees(state),
    isClinicOwnerEditAllowed: selectCurrentUserIsPlatformOwner(state),
    availableRoles: selectRolesAllowedToOperateWith(state),
  };
};

const mapDispatchToProps: DispatchToComponentFunctionPropsMapper<
  EmployeeListPageProps
> = dispatch => {
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
