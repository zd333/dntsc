import * as React from 'react';
import * as yup from 'yup';
import { AppAccessRoles } from '@api/app-access-roles';
import { EmployeeVM } from './EmployeeListItem';
import { Field, Form, Formik, FormikActions, FormikProps } from 'formik';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Omitted } from '../../../shared/types/omitted.type';
import { Select, TextField } from 'formik-material-ui';
import {
  createStyles,
  withStyles,
  WithStyles,
  Button,
  Theme,
  Input,
  Chip,
  Grid,
  MenuItem,
} from '@material-ui/core';

export interface EmployeeDetailsFormProps {
  readonly employee: EmployeeVM;
  readonly availableRoles: Array<AppAccessRoles>;
  readonly onSubmit: (params: {
    readonly id: EmployeeVM['id'];
    readonly employeeUpdates: EmployeeDetailsFormValues;
  }) => void;
  readonly onCancelEdit: () => void;
}

/**
 * Formik typings.
 * Form does not allow to change `id`, `login` (they are never changed)
 * and does not support changing `isActive` (since it can be changed in employee list).
 * So form has `name` and `roles` controls.
 */
export type EmployeeDetailsFormValues = Omitted<
  EmployeeVM,
  'id' | 'login' | 'isActive'
>;

const StyledEmployeeDetailsForm: React.FunctionComponent<
  StyledTranslatedEmployeeDetailsFormProps
> = props => {
  const {
    classes,
    intl,
    employee,
    availableRoles,
    onSubmit,
    onCancelEdit,
  } = props;
  const { id: _, ...initialFormValues } = employee;

  const nameFieldName = intl.formatMessage({
    id: 'employeeManagementPage.employeeDetailsForm.nameControl.label',
  });
  const rolesFieldName = intl.formatMessage({
    id: 'employeeManagementPage.employeeDetailsForm.rolesControl.label',
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
    roles: yup.array(yup.string()),
  });

  const isEmployeeClinicOwner = () =>
    Array.isArray(employee.roles) &&
    employee.roles.some(role => role === '_CLINIC_OWNER');

  return (
    <Formik
      enableReinitialize={true}
      isInitialValid={true}
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={(
        values: EmployeeDetailsFormValues,
        actions: FormikActions<EmployeeDetailsFormValues>,
      ) => {
        onSubmit({
          id: employee.id,
          employeeUpdates: values,
        });
        actions.setSubmitting(false);
      }}
      render={({
        submitForm,
        resetForm,
        isValid,
        values,
      }: FormikProps<EmployeeDetailsFormValues>) => (
        <Form>
          <Grid container spacing={24}>
            {/* Name */}
            <Grid item xs={12}>
              <Field
                component={TextField}
                name="name"
                label={nameFieldName}
                fullWidth={true}
              />
            </Grid>

            {/* Roles */}
            <Grid item xs={12}>
              <Field
                component={Select}
                name="roles"
                // Makes no sense to add other roles to clinic owners
                disabled={isEmployeeClinicOwner()}
                multiple
                input={<Input id="roles-select" />}
                renderValue={(selectedRoles: Array<AppAccessRoles>) => (
                  <div className={classes.chips}>
                    {selectedRoles.map(role => (
                      <Chip
                        key={role}
                        label={intl.formatMessage({
                          id: `appAccessRole.${role}`,
                        })}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                label={rolesFieldName}
                fullWidth={true}
              >
                {availableRoles.map(role => (
                  <MenuItem key={role} value={role}>
                    {intl.formatMessage({
                      id: `appAccessRole.${role}`,
                    })}
                  </MenuItem>
                ))}
              </Field>
            </Grid>

            <Grid item xs={12} className={classes.buttonsRow}>
              <Button
                variant="contained"
                onClick={() => {
                  resetForm();
                  onCancelEdit();
                }}
              >
                <FormattedMessage id="common.cancelButtonLabel" />
              </Button>

              <Button
                variant="contained"
                color="primary"
                disabled={!isValid}
                onClick={submitForm}
              >
                <FormattedMessage id="common.saveButtonLabel" />
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    />
  );
};

const EmployeeDetailsFormStyles = ({ spacing }: Theme) =>
  createStyles({
    buttonsRow: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: spacing.unit / 4,
    },
  });

type StyledTranslatedEmployeeDetailsFormProps = EmployeeDetailsFormProps &
  InjectedIntlProps &
  WithStyles<typeof EmployeeDetailsFormStyles>;

const TranslatedEmployeeDetailsForm = injectIntl(StyledEmployeeDetailsForm);
export const EmployeeDetailsForm = React.memo(
  withStyles(EmployeeDetailsFormStyles)(TranslatedEmployeeDetailsForm),
);
