import * as React from 'react';
import { EmployeeDetailsOutDto } from '@api/sub-features/employees/dto/employee-details.out-dto';
import { employeesEpics } from '../epics';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';

export interface EmployeeListItemProps {
  readonly employee: EmployeeVM;
  readonly onIsActiveChange: (params: {
    readonly isActive: EmployeeVM['isActive'];
    readonly id: EmployeeVM['id'];
  }) => void;
}

const StyledEmployeeListItem: React.FunctionComponent<
  StyledEmployeeListItemProps
> = props => {
  const { classes, employee } = props;

  const getEmployeeRolesText = () =>
    Array.isArray(employee.roles) && employee.roles.length
      ? // TODO: translations
        employee.roles.map(role => `appAccessRole.${role}`).join(', ')
      : 'no roles (TODO: translate)';

  return (
    <ListItem key={employee.id}>
      <ListItemText
        primary={employee.name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              className={classes.inline}
              color="textPrimary"
            >
              {employee.login}
            </Typography>
            {` — ${getEmployeeRolesText()}`}
          </React.Fragment>
        }
      />
      {/* TODO: is active toggler */}

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
    inline: {
      display: 'inline',
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
