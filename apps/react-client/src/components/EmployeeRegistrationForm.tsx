import * as React from 'react';
import * as yup from 'yup';
import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { RegisterEmployeeInDto } from '../../../api/src/sub-features/employees/dto/register-employee.in-dto';
import { TextField } from 'formik-material-ui';
import {
  createStyles,
  withStyles,
  WithStyles,
  Button,
  Grid,
} from '@material-ui/core';

export interface EmployeeRegistrationFormProps {
  readonly isDisabled: boolean;
  readonly onSubmit: (params: {
    readonly employeeData: EmployeeRegistrationFormValues;
  }) => void;
}

/**
 * Formik typings.
 */
export type EmployeeRegistrationFormValues = Pick<
  RegisterEmployeeInDto,
  'login' | 'name'
> & {
  readonly password: string;
};

const StyledEmployeeRegistrationForm: React.FunctionComponent<
  StyledTranslatedEmployeeRegistrationFormProps
> = props => {
  const { classes, intl, isDisabled, onSubmit } = props;

  const nameFieldName = intl.formatMessage({
    id: 'employeeRegistrationPage.employeeRegistrationForm.nameControl.label',
  });
  const loginFieldName = intl.formatMessage({
    id: 'employeeRegistrationPage.employeeRegistrationForm.loginControl.label',
  });
  const passwordFieldName = intl.formatMessage({
    id:
      'employeeRegistrationPage.employeeRegistrationForm.passwordControl.label',
  });

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required(
        intl.formatMessage(
          {
            id: 'common.validationErrorMessage.requiredField',
          },
          {
            fieldName: nameFieldName,
          },
        ),
      )
      .min(
        3,
        intl.formatMessage(
          { id: 'common.validationErrorMessage.stringMin' },
          { fieldName: nameFieldName },
        ),
      ),
    login: yup
      .string()
      .required(
        intl.formatMessage(
          {
            id: 'common.validationErrorMessage.requiredField',
          },
          {
            fieldName: loginFieldName,
          },
        ),
      )
      .min(
        3,
        intl.formatMessage(
          { id: 'common.validationErrorMessage.stringMin' },
          { fieldName: loginFieldName },
        ),
      ),
    password: yup
      .string()
      .required(
        intl.formatMessage(
          {
            id: 'common.validationErrorMessage.requiredField',
          },
          {
            fieldName: passwordFieldName,
          },
        ),
      )
      .min(
        4,
        intl.formatMessage(
          { id: 'common.validationErrorMessage.stringMin' },
          { fieldName: passwordFieldName },
        ),
      ),
  });

  const initialFormValues: EmployeeRegistrationFormValues = {
    name: '',
    login: '',
    password: '',
  };

  return (
    <Formik
      enableReinitialize={true}
      isInitialValid={true}
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={(
        values: EmployeeRegistrationFormValues,
        actions: FormikActions<EmployeeRegistrationFormValues>,
      ) => {
        onSubmit({
          employeeData: values,
        });
        actions.setSubmitting(false);
      }}
      render={({
        submitForm,
        isValid,
      }: FormikProps<EmployeeRegistrationFormValues>) => (
        <Form>
          <Grid container spacing={24}>
            {/* Name */}
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="name"
                disabled={isDisabled}
                label={nameFieldName}
                fullWidth={true}
              />
            </Grid>

            {/* Login */}
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="login"
                disabled={isDisabled}
                label={loginFieldName}
                fullWidth={true}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="password"
                disabled={isDisabled}
                type="password"
                label={passwordFieldName}
                fullWidth={true}
              />
            </Grid>

            <Grid item xs={12} className={classes.buttonsRow}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={isDisabled || !isValid}
                onClick={submitForm}
              >
                <FormattedMessage id="employeeRegistrationPage.employeeRegistrationForm.submitButton.text" />
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    />
  );
};

const EmployeeRegistrationFormStyles = () =>
  createStyles({
    buttonsRow: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  });

type StyledTranslatedEmployeeRegistrationFormProps = EmployeeRegistrationFormProps &
  InjectedIntlProps &
  WithStyles<typeof EmployeeRegistrationFormStyles>;

const TranslatedEmployeeRegistrationForm = injectIntl(
  StyledEmployeeRegistrationForm,
);
export const EmployeeRegistrationForm = React.memo(
  withStyles(EmployeeRegistrationFormStyles)(
    TranslatedEmployeeRegistrationForm,
  ),
);
