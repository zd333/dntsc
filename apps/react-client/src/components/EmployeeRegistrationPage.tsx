import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  EmployeeRegistrationForm,
  EmployeeRegistrationFormValues,
} from './EmployeeRegistrationForm';
import {
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Paper,
  CircularProgress,
} from '@material-ui/core';

export interface EmployeeRegistrationPageProps {
  readonly isBusy: boolean;
  /**
   * `undefined` means is unknown if registered or not.
   */
  readonly isAlreadyRegistered: boolean | undefined;
  readonly onRegister: (params: {
    readonly employeeData: EmployeeRegistrationFormValues;
  }) => void;
}

const StyledEmployeeRegistrationPage: React.FunctionComponent<
  StyledEmployeeRegistrationPageProps
> = props => {
  const { classes, isBusy, isAlreadyRegistered, onRegister } = props;
  const handleEmployeeSubmit = (params: {
    readonly employeeData: EmployeeRegistrationFormValues;
  }) => onRegister({ employeeData: params.employeeData });

  return (
    <React.Fragment>
      {isBusy && <CircularProgress className={classes.spinner} />}

      {/* Show registration form only when flag is `false`
        (do not show it when it is not defined - because it means still unknown) */}
      {isAlreadyRegistered === false && (
        <div className={classes.formContainer}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              <FormattedMessage id="employeeRegistrationPage.employeeRegistrationForm.title" />
            </Typography>
            <div className={classes.form}>
              <EmployeeRegistrationForm
                isDisabled={isBusy}
                onSubmit={handleEmployeeSubmit}
              />
            </div>
          </Paper>
        </div>
      )}

      {isAlreadyRegistered && (
        <div className={classes.messageContainer}>
          <Typography component="h1" variant="h5" gutterBottom>
            <FormattedMessage id="employeeRegistrationPage.alreadyRegisteredMessage" />
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            *
            <FormattedMessage id="employeeRegistrationPage.tokenCanBeExpiredMessage" />
          </Typography>
        </div>
      )}
    </React.Fragment>
  );
};

const EmployeeRegistrationPageStyles = ({ spacing, breakpoints }: Theme) =>
  createStyles({
    formContainer: {
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
    messageContainer: {
      width: 'auto',
      display: 'block',
      marginLeft: spacing.unit * 3,
      marginRight: spacing.unit * 3,
      marginTop: '20%',
      [breakpoints.up(400 + spacing.unit * 3 * 2)]: {
        width: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    spinner: {
      position: 'fixed',
      top: '50%',
      // TODO: horizontal centering is not ideal, fix this
      left: '50%',
    },
    paper: {
      marginTop: spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${spacing.unit * 2}px ${spacing.unit * 3}px ${spacing.unit *
        3}px`,
    },
    form: {
      width: '100%',
      marginTop: spacing.unit,
    },
  });

type StyledEmployeeRegistrationPageProps = EmployeeRegistrationPageProps &
  WithStyles<typeof EmployeeRegistrationPageStyles>;

export const EmployeeRegistrationPage = React.memo(
  withStyles(EmployeeRegistrationPageStyles)(StyledEmployeeRegistrationPage),
);
