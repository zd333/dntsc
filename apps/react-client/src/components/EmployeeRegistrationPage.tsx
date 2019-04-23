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
} from '@material-ui/core';

export interface EmployeeRegistrationPageProps {
  readonly onRegister: (params: {
    readonly employeeData: EmployeeRegistrationFormValues;
  }) => void;
}

//
const StyledEmployeeRegistrationPage: React.FunctionComponent<
  StyledEmployeeRegistrationPageProps
> = props => {
  const { classes, onRegister } = props;
  const handleEmployeeSubmit = (params: {
    readonly employeeData: EmployeeRegistrationFormValues;
  }) => onRegister({ employeeData: params.employeeData });

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          <FormattedMessage id="employeeRegistrationPage.employeeRegistrationForm.title" />
        </Typography>
        <div className={classes.form}>
          <EmployeeRegistrationForm onSubmit={handleEmployeeSubmit} />
        </div>
      </Paper>
    </main>
  );
};

const EmployeeRegistrationPageStyles = ({ spacing, breakpoints }: Theme) =>
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
