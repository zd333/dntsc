import * as React from 'react';
import { EmployeeDetailsOutDto } from '@api/sub-features/employees/dto/employee-details.out-dto';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
// TODO: finish
export interface EmployeeListItemProps {
  readonly employee: EmployeeVM;
  readonly onIsActiveChange: (params: {
    readonly isActive: EmployeeVM['isActive'];
  }) => void;
}

const StyledEmployeeListItem: React.FunctionComponent<
  StyledEmployeeListItemProps
> = props => {
  const { classes, employee } = props;

  return (
    <ListItem key={employee.id} dense>
      <ListItemText primary={employee.name} />
      {/* {updateIsAllowed && (
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Edit"
            onClick={() => handleUpdateClick(item.id)}
          >
            <Edit />
          </IconButton>
        </ListItemSecondaryAction>
      )} */}
    </ListItem>
  );
};

const EmployeeListItemStyles = ({ palette }: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: palette.background.paper,
    },
  });

type StyledEmployeeListItemProps = EmployeeListItemProps &
  WithStyles<typeof EmployeeListItemStyles>;

export const EmployeeListItem = withStyles(EmployeeListItemStyles)(
  React.memo(StyledEmployeeListItem),
);

/**
 * Use dedicated interface/type even if it is completely same as DTO just for flexibility
 * (VM can be adjusted later if needed).
 */
export type EmployeeVM = EmployeeDetailsOutDto;
