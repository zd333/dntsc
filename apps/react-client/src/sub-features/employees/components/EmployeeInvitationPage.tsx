import * as React from 'react';
import { AppAccessRoles } from '@api/app-access-roles';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import {
  createStyles,
  WithStyles,
  withStyles,
  FormControl,
  InputLabel,
  Input,
  Select,
  Theme,
  MenuItem,
  Chip,
  Button,
} from '@material-ui/core';

export interface EmployeeInvitationPageProps {
  readonly availableRoles: Array<AppAccessRoles>;
  readonly createdRegistrationToken: string;
  readonly onCreateRegistrationToken: (params: {
    readonly roles?: Array<AppAccessRoles>;
  }) => void;
}

interface EmployeeInvitationPageState {
  readonly selectedRoles: Array<AppAccessRoles>;
}

export class StyledEmployeeInvitationPage extends React.Component<
  StyledEmployeeInvitationPageProps,
  EmployeeInvitationPageState
> {
  public state = {
    selectedRoles: [],
  };

  // Lib typings for Select with multiple option is wrong
  // tslint:disable-next-line:no-any
  public handleRolesSelectChange = (event: any) => {
    const selectedRoles: Array<AppAccessRoles> = event.target.value;

    this.setState({
      selectedRoles,
    });
  };

  public handleSubmitButtonClick = () => {
    this.props.onCreateRegistrationToken({
      ...(this.state.selectedRoles.length
        ? { roles: this.state.selectedRoles }
        : {}),
    });
  };

  public getRegistrationLink = () =>
    `/register-employee/${this.props.createdRegistrationToken}`;

  public render(): JSX.Element {
    const {
      intl,
      classes,
      availableRoles,
      createdRegistrationToken,
    } = this.props;

    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="roles-select">
            <FormattedMessage id="employeeInvitationPage.invitationForm.rolesSelect.label" />
          </InputLabel>
          <Select
            multiple
            value={this.state.selectedRoles}
            onChange={this.handleRolesSelectChange}
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
            // MenuProps={MenuProps}
          >
            {availableRoles.map(role => (
              <MenuItem key={role} value={role}>
                {intl.formatMessage({
                  id: `appAccessRole.${role}`,
                })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div>
          <Button
            className={classes.submit}
            type="button"
            variant="contained"
            color="primary"
            onClick={this.handleSubmitButtonClick}
          >
            <FormattedMessage id="employeeInvitationPage.invitationForm.submitButton.text" />
          </Button>
        </div>

        {!!createdRegistrationToken && (
          <div className={classes.linkWrapper}>
            <Link to={this.getRegistrationLink()}>
              <FormattedMessage id="employeeInvitationPage.invitationLink.text" />
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const employeeInvitationPageStyles = ({ spacing }: Theme) =>
  createStyles({
    formControl: {
      margin: spacing.unit,
      width: '100%',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: spacing.unit / 4,
    },
    submit: {
      marginTop: spacing.unit * 3,
    },
    linkWrapper: {
      marginTop: spacing.unit * 3,
    },
  });

type StyledEmployeeInvitationPageProps = EmployeeInvitationPageProps &
  InjectedIntlProps &
  WithStyles<typeof employeeInvitationPageStyles>;

const TranslatedEmployeeInvitationPage = injectIntl(
  StyledEmployeeInvitationPage,
);
export const EmployeeInvitationPage = withStyles(employeeInvitationPageStyles)(
  TranslatedEmployeeInvitationPage,
);
