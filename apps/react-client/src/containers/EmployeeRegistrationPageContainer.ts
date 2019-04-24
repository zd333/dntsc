import { AllAppActions, RootState } from '../../src';
import { connect } from 'react-redux';
import { RegisterEmployeeRouteParams } from '../components/app-routes';
import { RouteComponentProps } from 'react-router';
import { selectAuthApiCommunicationIsInProgress } from '../selectors/auth-api-communication-is-in-progress.selector';
import { selectEmployeeRegistrationTokenIsAlreadyUsedOrExpired } from '../selectors/employee-registration-token-is-already-used-or-expired.selector';
import { SessionActions } from '../../src/actions/session.actions';
import {
  EmployeeRegistrationPage,
  EmployeeRegistrationPageProps,
} from '../../src/components/EmployeeRegistrationPage';
import {
  StateMapper,
  DispatchMapper,
} from '../../src/shared/types/container-state-mapper.interface';

type EmployeeRegistrationPageContainerRouterProps = RouteComponentProps<
  RegisterEmployeeRouteParams
>;

const mapStateToProps: StateMapper<
  EmployeeRegistrationPageProps,
  RootState
> = state => {
  return {
    isBusy: selectAuthApiCommunicationIsInProgress(state),
    isAlreadyRegisteredOrTokenIsExpired: selectEmployeeRegistrationTokenIsAlreadyUsedOrExpired(
      state,
    ),
  };
};

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
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeRegistrationPage);
