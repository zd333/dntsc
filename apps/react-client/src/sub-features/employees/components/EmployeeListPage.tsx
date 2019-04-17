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
  readonly onIsActiveChange: (params: {
    readonly employeeId: EmployeeVM['id'];
    readonly isActive: EmployeeVM['isActive'];
  }) => void;
}
// TODO: finish
const StyledEmployeeListPage: React.FunctionComponent<
  StyledEmployeeListPageProps
> = props => {
  const { classes, employees } = props;

  return (
    <div className={classes.root}>
      <List className={classes.root}>
        {(employees || []).map(employee => (
          <EmployeeListItem
            key={employee.id}
            employee={employee}
            onIsActiveChange={() => void 0}
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

export const EmployeeListPage = withStyles(EmployeeListPageStyles)(
  React.memo(StyledEmployeeListPage),
);
