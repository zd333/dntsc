import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';

const LOGIN_MIN_LENGTH = 3;

/**
 * Value should be ids from translation files.
 */
enum loginValidationErrors {
  EMPTY = 'loginPage.loginForm.loginInput.validationErrorMessages.empty',
  SHORT = 'loginPage.loginForm.loginInput.validationErrorMessages.short',
}
/**
 * Values should be ids from translation files.
 */
enum passwordValidationErrors {
  EMPTY = 'loginPage.loginForm.passwordInput.validationErrorMessages.empty',
}

export interface LoginPageProps {
  readonly isDisabled: boolean;
  readonly onLogin: (params: {
    readonly login: string;
    readonly password: string;
  }) => void;
}

interface LoginPageState {
  readonly login: string;
  readonly password: string;
  readonly loginIsDirty: boolean;
  readonly passwordIsDirty: boolean;
  readonly loginIsFocused: boolean;
  readonly passwordIsFocused: boolean;
}

// TODO: refactor with formik
class StyledLoginPage extends React.Component<
  StyledLoginPageProps,
  LoginPageState
> {
  public state = {
    login: '',
    password: '',
    loginIsDirty: false,
    passwordIsDirty: false,
    loginIsFocused: false,
    passwordIsFocused: false,
  };

  public handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      login: event.target.value,
      loginIsDirty: true,
    });
  };

  public handleLoginFocus = () => {
    this.setState({
      loginIsFocused: true,
    });
  };

  public handleLoginBlur = () => {
    this.setState({
      loginIsFocused: false,
    });
  };

  public getLoginValidationError = () => {
    if (!this.state.login) {
      return loginValidationErrors.EMPTY;
    }

    return this.state.login.length < LOGIN_MIN_LENGTH
      ? loginValidationErrors.SHORT
      : '';
  };

  public showLoginValidationError = () =>
    (this.state.loginIsDirty || !!this.state.login) &&
    !this.state.loginIsFocused &&
    !!this.getLoginValidationError();

  public handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState({
      password: event.target.value,
      passwordIsDirty: true,
    });
  };

  public handlePasswordFocus = () => {
    this.setState({
      passwordIsFocused: true,
    });
  };

  public handlePasswordBlur = () => {
    this.setState({
      passwordIsFocused: false,
    });
  };

  public getPasswordValidationError = () =>
    this.state.password ? '' : passwordValidationErrors.EMPTY;

  public showPasswordValidationError = () =>
    (this.state.passwordIsDirty || !!this.state.password) &&
    !this.state.passwordIsFocused &&
    !!this.getPasswordValidationError();

  public getFormCanBeSubmitted = () =>
    !this.props.isDisabled &&
    !this.getLoginValidationError() &&
    !this.getPasswordValidationError();

  public handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!this.getFormCanBeSubmitted()) {
      return;
    }

    const { login, password } = this.state;

    this.props.onLogin({ login, password });
  };

  public render(): JSX.Element {
    return (
      <main className={this.props.classes.layout}>
        <Paper className={this.props.classes.paper}>
          <Typography component="h1" variant="h5">
            <FormattedMessage id="loginPage.loginForm.title" />
          </Typography>
          <form
            className={this.props.classes.form}
            onSubmit={this.handleSubmit}
          >
            <FormControl
              error={this.showLoginValidationError()}
              margin="normal"
              required
              fullWidth
            >
              <InputLabel htmlFor="login">
                <FormattedMessage id="loginPage.loginForm.loginInput.label" />
              </InputLabel>
              <Input
                value={this.state.login}
                disabled={this.props.isDisabled}
                onChange={this.handleLoginChange}
                onFocus={this.handleLoginFocus}
                onBlur={this.handleLoginBlur}
                required
                name="login"
                autoComplete="login"
                autoFocus
              />
              {this.showLoginValidationError() && (
                <FormHelperText>
                  <FormattedMessage id={this.getLoginValidationError()} />
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              error={this.showPasswordValidationError()}
              margin="normal"
              required
              fullWidth
            >
              <InputLabel htmlFor="password">
                <FormattedMessage id="loginPage.loginForm.passwordInput.label" />
              </InputLabel>
              <Input
                value={this.state.password}
                disabled={this.props.isDisabled}
                onChange={this.handlePasswordChange}
                onFocus={this.handlePasswordFocus}
                onBlur={this.handlePasswordBlur}
                required
                name="password"
                type="password"
                autoComplete="current-password"
              />
              {this.showPasswordValidationError() && (
                <FormHelperText>
                  <FormattedMessage id={this.getPasswordValidationError()} />
                </FormHelperText>
              )}
            </FormControl>
            <Button
              disabled={!this.getFormCanBeSubmitted()}
              className={this.props.classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              <FormattedMessage id="loginPage.loginForm.submitButton.text" />
            </Button>
          </form>
          {this.props.isDisabled && (
            <CircularProgress className={this.props.classes.spinner} />
          )}
        </Paper>
      </main>
    );
  }
}

const loginPageStyles = ({ palette, spacing, breakpoints }: Theme) =>
  createStyles({
    layout: {
      width: 'auto',
      display: 'block',
      marginLeft: spacing.unit * 3,
      marginRight: spacing.unit * 3,
      [breakpoints.up(400 + spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit *
        3}px`,
    },
    avatar: {
      margin: spacing.unit,
      backgroundColor: palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: spacing.unit,
    },
    submit: {
      marginTop: spacing.unit * 3,
    },
    spinner: {
      position: 'fixed',
      top: '50%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  });

type StyledLoginPageProps = LoginPageProps & WithStyles<typeof loginPageStyles>;

export const LoginPage = withStyles(loginPageStyles)(StyledLoginPage);
