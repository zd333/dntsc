import * as React from 'react';
import { DashboardPage } from '../sub-features/dashboard/components/DashboardPage';
import { EmployeeInvitationPageContainer } from '../sub-features/employees/containers/EmployeeInvitationPageContainer';
import { EmployeeListPageContainer } from '../sub-features/employees/containers/EmployeeListPageContainer';
import { EmployeeRegistrationPageContainer } from '../containers/EmployeeRegistrationPageContainer';
import { InventoryCatalogPageContainer } from '../sub-features/inventory/containers/InventoryCatalogPageContainer';
import { LoginPageContainer } from '../containers/LoginPageContainer';
import { Redirect, Route, Switch } from 'react-router';
import { ShellContainer } from '../containers/ShellContainer';

export interface RegisterEmployeeRouteParams {
  readonly registrationToken: string;
}

export enum AppRouePaths {
  registerEmployee = '/register-employee/:registrationToken',
  login = '/login',
  dashboard = '/dashboard',
  inventoryCatalog = '/inventory/catalog',
  employeeInvitation = '/employees/invite',
  employeeManagement = '/employees/manage',
}

export interface AppRoutesProps {
  readonly isUserLoggedIn?: boolean;
  readonly isInventoryEnabled: boolean;
  readonly isEmployeesEnabled: boolean;
}

const NotMemoizedAppRoutes: React.FunctionComponent<AppRoutesProps> = props => {
  const { isUserLoggedIn, isInventoryEnabled, isEmployeesEnabled } = props;
  if (typeof isUserLoggedIn === 'undefined') {
    // Wait until we know logged in status to avoid redirections
    return <div />;
  }

  if (!isUserLoggedIn) {
    return (
      <Switch>
        <Route
          path={AppRouePaths.registerEmployee}
          component={EmployeeRegistrationPageContainer}
        />
        <Route path={AppRouePaths.login} component={LoginPageContainer} />
        <Redirect to={AppRouePaths.login} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Redirect from="/" exact={true} to={AppRouePaths.dashboard} />
      <Route
        path={AppRouePaths.registerEmployee}
        component={EmployeeRegistrationPageContainer}
      />
      <ShellContainer>
        <Switch>
          <Route path={AppRouePaths.dashboard} component={DashboardPage} />
          {isInventoryEnabled && (
            <Route
              path={AppRouePaths.inventoryCatalog}
              component={InventoryCatalogPageContainer}
            />
          )}
          {isEmployeesEnabled && (
            <Route
              path={AppRouePaths.employeeInvitation}
              component={EmployeeInvitationPageContainer}
            />
          )}
          {isEmployeesEnabled && (
            <Route
              path={AppRouePaths.employeeManagement}
              component={EmployeeListPageContainer}
            />
          )}

          <Redirect to="/" />
        </Switch>
      </ShellContainer>
    </Switch>
  );
};

export const AppRoutes = React.memo(NotMemoizedAppRoutes);
