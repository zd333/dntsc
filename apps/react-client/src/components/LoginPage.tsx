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

/**
 * Value should be ids from translation files.
 */
enum emailValidationErrors {
  EMPTY = 'loginPage.loginForm.emailInput.validationErrorMessages.empty',
  INVALID = 'loginPage.loginForm.emailInput.validationErrorMessages.invalid',
}
/**
 * Values should be ids from translation files.
 */
enum passwordValidationErrors {
  EMPTY = 'loginPage.loginForm.passwordInput.validationErrorMessages.empty',
}

export interface LoginPageProps {
  readonly isDisabled: boolean;
  readonly onEmailLogin: (params: {
    readonly email: string;
    readonly password: string;
  }) => void;
}

interface LoginPageState {
  readonly email: string;
  readonly password: string;
  readonly emailIsDirty: boolean;
  readonly passwordIsDirty: boolean;
  readonly emailIsFocused: boolean;
  readonly passwordIsFocused: boolean;
}

// TODO: refactor with formik
class StyledLoginPage extends React.PureComponent<
  StyledLoginPageProps,
  LoginPageState
> {
  public state = {
    email: '',
    password: '',
    emailIsDirty: false,
    passwordIsDirty: false,
    emailIsFocused: false,
    passwordIsFocused: false,
  };

  public handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: event.target.value,
      emailIsDirty: true,
    });
  };

  public handleEmailFocus = () => {
    this.setState({
      emailIsFocused: true,
    });
  };

  public handleEmailBlur = () => {
    this.setState({
      emailIsFocused: false,
    });
  };

  public getEmailValidationError = () => {
    if (!this.state.email) {
      return emailValidationErrors.EMPTY;
    }
    // No way to make it shorter :)
    /* tslint:disable-next-line:max-line-length */
    const emailValidationRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailValidationRegexp.test(String(this.state.email).toLowerCase())
      ? ''
      : emailValidationErrors.INVALID;
  };

  public showEmailValidationError = () =>
    (this.state.emailIsDirty || !!this.state.email) &&
    !this.state.emailIsFocused &&
    !!this.getEmailValidationError();

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
    !this.getEmailValidationError() &&
    !this.getPasswordValidationError();

  public handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!this.getFormCanBeSubmitted()) {
      return;
    }

    const { email, password } = this.state;

    this.props.onEmailLogin({ email, password });
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
              error={this.showEmailValidationError()}
              margin="normal"
              required
              fullWidth
            >
              <InputLabel htmlFor="email">
                <FormattedMessage id="loginPage.loginForm.emailInput.label" />
              </InputLabel>
              <Input
                value={this.state.email}
                disabled={this.props.isDisabled}
                onChange={this.handleEmailChange}
                onFocus={this.handleEmailFocus}
                onBlur={this.handleEmailBlur}
                required
                name="email"
                autoComplete="email"
                autoFocus
              />
              {this.showEmailValidationError() && (
                <FormHelperText>
                  <FormattedMessage id={this.getEmailValidationError()} />
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
