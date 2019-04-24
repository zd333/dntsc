import { connect } from 'react-redux';
import { EmployeesActions } from '../actions/employees.actions';
import { RootState } from '../../..';
import { selectCreatedEmployeeRegistrationToken } from '../selectors/created-employee-registration-token.selector';
import { selectRolesAllowedToOperateWith } from '../selectors/roles-allowed-to-operate-with.selector';
import {
  EmployeeInvitationPageProps,
  EmployeeInvitationPage,
} from '../components/EmployeeInvitationPage';

import {
  StateToComponentNonFunctionPropsMapper,
  DispatchToComponentFunctionPropsMapper,
} from '../../../shared/types/container-state-mapper.interface';

const mapStateToProps: StateToComponentNonFunctionPropsMapper<
  EmployeeInvitationPageProps,
  RootState
> = state => {
  return {
    availableRoles: selectRolesAllowedToOperateWith(state),
    createdRegistrationToken: selectCreatedEmployeeRegistrationToken(state),
  };
};

const mapDispatchToProps: DispatchToComponentFunctionPropsMapper<
  EmployeeInvitationPageProps
> = dispatch => {
  return {
    onCreateRegistrationToken: params => {
      dispatch(
        EmployeesActions.createEmployeeRegistrationTokenStart({
          roles: params.roles,
        }),
      );
    },
  };
};

export const EmployeeInvitationPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeInvitationPage);
