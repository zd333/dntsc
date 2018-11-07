import { Action as ReduxAction, AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { LoginPage, LoginPageProps } from 'src/components/LoginPage';
import { RootState } from 'src';
import { selectLoginPageIsDisabled } from 'src/selectors/login-page-is-disabled.selector';
import { SessionActions } from 'src/actions/session.actions';

const mapStateToProps: StateMapper<LoginPageProps, RootState> = state => {
  return {
    isDisabled: selectLoginPageIsDisabled(state),
  };
};

const mapDispatchToProps: DispatchMapper<LoginPageProps> = dispatch => {
  return {
    onEmailLogin: () => {
      dispatch(
        SessionActions.emailLoginStart({
          email: 'TODO email',
          password: 'TODO password',
        }),
      );
    },
  };
};

export const LoginPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);

// TODO: move to dedicated shared file
type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never
};
type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
type PartialConditionalSubType<Base, Condition> = Partial<
  Pick<Base, AllowedNames<Base, Condition>>
>;
type FunctionProps<Base> = PartialConditionalSubType<
  Base,
  (...args: any) => any
>;

export type StateMapper<WrappedComponentProps, State, OwnProps = {}> = (
  state: State,
  ownProps?: OwnProps,
) => Partial<WrappedComponentProps>;

export type DispatchMapper<
  WrappedComponentProps,
  Action extends ReduxAction = AnyAction
> = (dispatch: Dispatch<Action>) => FunctionProps<WrappedComponentProps>;
