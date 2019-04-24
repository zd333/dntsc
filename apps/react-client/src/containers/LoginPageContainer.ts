import { connect } from 'react-redux';
import { LoginPage, LoginPageProps } from '../../src/components/LoginPage';
import { RootState } from '../../src';
import { selectAuthApiCommunicationIsInProgress } from '../selectors/auth-api-communication-is-in-progress.selector';
import { SessionActions } from '../../src/actions/session.actions';
import {
  StateToComponentNonFunctionPropsMapper,
  DispatchToComponentFunctionPropsMapper,
} from '../../src/shared/types/container-state-mapper.interface';

const mapStateToProps: StateToComponentNonFunctionPropsMapper<
  LoginPageProps,
  RootState
> = state => {
  return {
    isDisabled: selectAuthApiCommunicationIsInProgress(state),
  };
};

const mapDispatchToProps: DispatchToComponentFunctionPropsMapper<
  LoginPageProps
> = dispatch => {
  return {
    onLogin: params => {
      dispatch(
        SessionActions.loginStart({
          login: params.login,
          password: params.password,
        }),
      );
    },
  };
};

export const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
