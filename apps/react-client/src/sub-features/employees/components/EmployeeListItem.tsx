import * as React from 'react';
import { EmployeeDetailsOutDto } from '@api/sub-features/employees/dto/employee-details.out-dto';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Switch,
  Button,
} from '@material-ui/core';

export interface EmployeeListItemProps {
  readonly employee: EmployeeVM;
  readonly onIsActiveChange: (params: {
    readonly isActive: EmployeeVM['isActive'];
    readonly id: EmployeeVM['id'];
  }) => void;
}

const StyledEmployeeListItem: React.FunctionComponent<
  StyledTranslatedEmployeeListItemProps
> = props => {
  const { classes, intl, employee, onIsActiveChange } = props;

  const getEmployeeUpdatesAreDenied = () => {
    // Do not allow to edit clinic owners - clinic staff should ask platform owner about such things
    return (
      !!employee &&
      Array.isArray(employee.roles) &&
      employee.roles.some(role => role === '_CLINIC_OWNER')
    );
  };
  const getEmployeeRolesText = () =>
    Array.isArray(employee.roles) && employee.roles.length
      ? employee.roles
          .map(role => intl.formatMessage({ id: `appAccessRole.${role}` }))
          .join(', ')
      : intl.formatMessage({
          id: 'employeeManagementPage.employeeList.item.noRolesMessage',
        });
  const handleIsActiveSwitchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    onIsActiveChange({ isActive: checked, id: employee.id });
  };

  return (
    <ListItem key={employee.id}>
      <Switch
        disabled={getEmployeeUpdatesAreDenied()}
        checked={employee.isActive}
        onChange={handleIsActiveSwitchChange}
      />

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

      {/* TODO: make mobile friendly */}
      <ListItemSecondaryAction>
        {/* TODO: implement */}
        <Button
          disabled={true || getEmployeeUpdatesAreDenied()}
          variant="contained"
          color="primary"
        >
          <FormattedMessage id="employeeManagementPage.employeeList.item.changeRolesButton.label" />
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const EmployeeListItemStyles = ({ palette }: Theme) =>
  createStyles({
    inline: {
      display: 'inline',
    },
  });

type StyledTranslatedEmployeeListItemProps = EmployeeListItemProps &
  InjectedIntlProps &
  WithStyles<typeof EmployeeListItemStyles>;

const TranslatedEmployeeListItem = injectIntl(StyledEmployeeListItem);

export const EmployeeListItem = React.memo(
  withStyles(EmployeeListItemStyles)(TranslatedEmployeeListItem),
);

/**
 * Use dedicated interface/type even if it is completely same as DTO just for flexibility
 * (VM can be adjusted later if needed).
 */
export type EmployeeVM = EmployeeDetailsOutDto;
