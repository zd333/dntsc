import { AllAppActions, RootState } from '../../src';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { SessionActions } from '../../src/actions/session.actions';
import {
  EmployeeRegistrationPage,
  EmployeeRegistrationPageProps,
} from '../../src/components/EmployeeRegistrationPage';
import {
  StateMapper,
  DispatchMapper,
} from '../../src/shared/types/container-state-mapper.interface';

type EmployeeRegistrationPageContainerRouterProps = RouteComponentProps<{
  readonly registrationToken: string;
}>;

const mapDispatchToProps: DispatchMapper<
  EmployeeRegistrationPageProps,
  AllAppActions,
  EmployeeRegistrationPageContainerRouterProps
> = (dispatch, ownProps) => {
  return {
    onRegister: params => {
      dispatch(
        SessionActions.registerEmployeeStart({
          name: params.employeeData.name,
          login: params.employeeData.login,
          password: params.employeeData.password,
          registrationToken: ownProps.match.params.registrationToken,
        }),
      );
    },
  };
};

export const EmployeeRegistrationPageContainer = connect(
  undefined,
  mapDispatchToProps,
)(EmployeeRegistrationPage);
