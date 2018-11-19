import { connect } from 'react-redux';
import { LoginPage, LoginPageProps } from 'src/components/LoginPage';
import { RootState } from 'src';
import { selectLoginPageIsDisabled } from 'src/selectors/login-page-is-disabled.selector';
import { SessionActions } from 'src/actions/session.actions';
import {
  StateMapper,
  DispatchMapper,
} from 'src/shared/interfaces/container-state-mapper.interface';

const mapStateToProps: StateMapper<LoginPageProps, RootState> = state => {
  return {
    isDisabled: selectLoginPageIsDisabled(state),
  };
};

const mapDispatchToProps: DispatchMapper<LoginPageProps> = dispatch => {
  return {
    onEmailLogin: params => {
      dispatch(
        SessionActions.emailLoginStart({
          email: params.email,
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
