import * as React from 'react';
import { AppAccessRoles } from '@api/app-access-roles';
import { EmployeeListItem, EmployeeVM } from './EmployeeListItem';
import { FormattedMessage } from 'react-intl';
import {
  EmployeeDetailsForm,
  EmployeeDetailsFormValues,
} from './EmployeeDetailsForm';
import {
  createStyles,
  WithStyles,
  withStyles,
  List,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

export interface EmployeeListPageProps {
  readonly employees: Array<EmployeeVM>;
  readonly isClinicOwnerEditAllowed: boolean;
  readonly availableRoles: Array<AppAccessRoles>;
  readonly onEmployeeChanges: (params: {
    readonly updatedEmployee: EmployeeVM;
    readonly originalEmployee: EmployeeVM;
  }) => void;
}

const StyledEmployeeListPage: React.FunctionComponent<
  StyledEmployeeListPageProps
> = props => {
  const {
    classes,
    employees,
    isClinicOwnerEditAllowed,
    availableRoles,
    onEmployeeChanges,
  } = props;

  const [idOfEmployeeBeingEdited, setIdOfEmployeeBeingEdited] = React.useState<
    EmployeeVM['id'] | undefined
  >(undefined);

  const getEmployeeBeingEdited = () =>
    idOfEmployeeBeingEdited
      ? employees.find(employee => employee.id === idOfEmployeeBeingEdited)
      : undefined;
  const isEmployeeEditAllowed = (employee: EmployeeVM) =>
    isClinicOwnerEditAllowed ||
    !Array.isArray(employee.roles) ||
    !employee.roles.some(role => role === '_CLINIC_OWNER');

  const handleIsActiveChange = (params: {
    readonly isActive: EmployeeVM['isActive'];
    readonly id: EmployeeVM['id'];
  }) => {
    const { id, isActive } = params;
    const originalEmployee = employees.find(employee => employee.id === id);

    if (!originalEmployee) {
      return;
    }

    const updatedEmployee = { ...originalEmployee, isActive };

    onEmployeeChanges({ updatedEmployee, originalEmployee });
  };
  const handleEditEmployeeClick = (params: { readonly id: EmployeeVM['id'] }) =>
    setIdOfEmployeeBeingEdited(params.id);
  const handleCancelEditEmployee = () => setIdOfEmployeeBeingEdited(undefined);
  const handleSubmitEmployee = (params: {
    readonly id: EmployeeVM['id'];
    readonly employeeUpdates: EmployeeDetailsFormValues;
  }) => {
    setIdOfEmployeeBeingEdited(undefined);

    const { id, employeeUpdates } = params;
    const originalEmployee = employees.find(employee => employee.id === id);

    if (!originalEmployee) {
      return;
    }

    const updatedEmployee = {
      ...originalEmployee,
      ...employeeUpdates,
    };

    onEmployeeChanges({ updatedEmployee, originalEmployee });
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <List className={classes.root}>
          {(employees || []).map(employee => (
            <EmployeeListItem
              key={employee.id}
              employee={employee}
              isEditAllowed={isEmployeeEditAllowed(employee)}
              onIsActiveChange={handleIsActiveChange}
              onEditClick={handleEditEmployeeClick}
            />
          ))}
        </List>
      </div>

      <Dialog
        aria-labelledby="edit-employee-dialog-title"
        classes={{ paper: classes.editEmployeeDialogPaper }}
        open={!!idOfEmployeeBeingEdited}
        onClose={handleCancelEditEmployee}
      >
        <DialogTitle id="edit-employee-dialog-title">
          <FormattedMessage id="employeeManagementPage.editEmployeeDialog.title" />
        </DialogTitle>
        <DialogContent classes={{ root: classes.editEmployeeDialogContent }}>
          {!!getEmployeeBeingEdited() && (
            <EmployeeDetailsForm
              // Employee will be always defined due to conditional rendering statement above
              employee={getEmployeeBeingEdited() as EmployeeVM}
              availableRoles={availableRoles}
              onSubmit={handleSubmitEmployee}
              onCancelEdit={handleCancelEditEmployee}
            />
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

const EmployeeListPageStyles = () =>
  createStyles({
    root: {
      width: '100%',
    },
    editEmployeeDialogPaper: {
      overflowY: 'visible',
    },
    editEmployeeDialogContent: {
      overflowY: 'visible',
    },
  });

type StyledEmployeeListPageProps = EmployeeListPageProps &
  WithStyles<typeof EmployeeListPageStyles>;

export const EmployeeListPage = React.memo(
  withStyles(EmployeeListPageStyles)(StyledEmployeeListPage),
);
