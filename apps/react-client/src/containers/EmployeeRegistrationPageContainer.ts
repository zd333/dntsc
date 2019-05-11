import { AllAppActions, RootState } from '../../src';
import { connect } from 'react-redux';
import { RegisterEmployeeRouteParams } from '../components/AppRoutes';
import { RouteComponentProps } from 'react-router';
import { selectAuthApiCommunicationIsInProgress } from '../selectors/auth-api-communication-is-in-progress.selector';
import { selectEmployeeRegistrationTokenIsAlreadyUsedOrExpired } from '../selectors/employee-registration-token-is-already-used-or-expired.selector';
import { SessionActions } from '../actions/session.actions';
import {
  EmployeeRegistrationPage,
  EmployeeRegistrationPageProps,
} from '../components/EmployeeRegistrationPage';
import {
  StateToComponentNonFunctionPropsMapper,
  DispatchToComponentFunctionPropsMapper,
} from '../shared/types/container-state-mapper.interface';

type EmployeeRegistrationPageContainerRouterProps = RouteComponentProps<
  RegisterEmployeeRouteParams
>;

const mapStateToProps: StateToComponentNonFunctionPropsMapper<
  EmployeeRegistrationPageProps,
  RootState
> = state => {
  return {
    isBusy: selectAuthApiCommunicationIsInProgress(state),
    isAlreadyRegistered: selectEmployeeRegistrationTokenIsAlreadyUsedOrExpired(
      state,
    ),
  };
};

const mapDispatchToProps: DispatchToComponentFunctionPropsMapper<
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
