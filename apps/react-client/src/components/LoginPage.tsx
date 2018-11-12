import * as React from 'react';
import { loginPageStyles } from './LoginPage.styles';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Input,
  Button,
  withStyles,
  WithStyles,
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
type StyledLoginPageProps = LoginPageProps & WithStyles<typeof loginPageStyles>;

const StyledLoginPage: React.SFC<StyledLoginPageProps> = props => {
  const { classes } = props;

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Пароль</InputLabel>
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
            Войти
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export const LoginPage = withStyles(loginPageStyles)(StyledLoginPage);
