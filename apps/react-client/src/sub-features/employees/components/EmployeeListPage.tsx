import * as React from 'react';
import { EmployeeListItem, EmployeeVM } from './EmployeeListItem';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  List,
} from '@material-ui/core';
export interface EmployeeListPageProps {
  readonly employees: Array<EmployeeVM>;
  readonly onEmployeeChanges: (params: {
    readonly updatedEmployee: EmployeeVM;
    readonly originalEmployee: EmployeeVM;
  }) => void;
}

const StyledEmployeeListPage: React.FunctionComponent<
  StyledEmployeeListPageProps
> = props => {
  const { classes, employees, onEmployeeChanges } = props;

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

  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {(employees || []).map(employee => (
          <EmployeeListItem
            key={employee.id}
            employee={employee}
            onIsActiveChange={handleIsActiveChange}
          />
        ))}
      </List>
    </div>
  );
};

const EmployeeListPageStyles = () =>
  createStyles({
    root: {
      width: '100%',
    },
  });

type StyledEmployeeListPageProps = EmployeeListPageProps &
  WithStyles<typeof EmployeeListPageStyles>;

export const EmployeeListPage = React.memo(
  withStyles(EmployeeListPageStyles)(StyledEmployeeListPage),
);
