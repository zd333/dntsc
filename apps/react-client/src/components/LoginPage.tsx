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
} from '@material-ui/core';

export interface LoginPageProps {
  isDisabled: boolean;
  onEmailLogin: (
    params: {
      readonly email: string;
      readonly password: string;
    },
  ) => void;
}

const StyledLoginPage: React.SFC<StyledLoginPageProps> = props => {
  const { classes } = props;

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          <FormattedMessage id="loginPage.loginForm.title" />
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">
              <FormattedMessage id="loginPage.loginForm.emailInput.label" />
            </InputLabel>
            <Input name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">
              <FormattedMessage id="loginPage.loginForm.passwordInput.label" />
            </InputLabel>
            <Input
              name="password"
              type="password"
              autoComplete="current-password"
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <FormattedMessage id="loginPage.loginForm.submitButton.text" />
          </Button>
        </form>
      </Paper>
    </main>
  );
};

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
  });

type StyledLoginPageProps = LoginPageProps & WithStyles<typeof loginPageStyles>;

export const LoginPage = withStyles(loginPageStyles)(StyledLoginPage);
