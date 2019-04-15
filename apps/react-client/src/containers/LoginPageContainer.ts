import { connect } from 'react-redux';
import { LoginPage, LoginPageProps } from '../../src/components/LoginPage';
import { RootState } from '../../src';
import { selectLoginPageIsBusy } from '../selectors/login-page-is-busy.selector';
import { SessionActions } from '../../src/actions/session.actions';
import {
  StateMapper,
  DispatchMapper,
} from '../../src/shared/types/container-state-mapper.interface';

const mapStateToProps: StateMapper<LoginPageProps, RootState> = state => {
  return {
    isDisabled: selectLoginPageIsBusy(state),
  };
};

const mapDispatchToProps: DispatchMapper<LoginPageProps> = dispatch => {
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
