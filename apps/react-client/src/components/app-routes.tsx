import * as React from 'react';
import { DashboardPage } from '../sub-features/dashboard/components/DashboardPage';
import { EmployeeInvitationPageContainer } from '../sub-features/employees/containers/EmployeeInvitationPageContainer';
import { EmployeeListPageContainer } from '../sub-features/employees/containers/EmployeeListPageContainer';
import { EmployeeRegistrationPageContainer } from '../containers/EmployeeRegistrationPageContainer';
import { InventoryCatalogPageContainer } from '../sub-features/inventory/containers/InventoryCatalogPageContainer';
import { LoginPageContainer } from '../containers/LoginPageContainer';
import { Redirect, Route, Switch } from 'react-router';
import { ShellContainer } from '../containers/ShellContainer';

export enum AppRouePaths {
  // TODO: add pendingApproval = '/pending-approval',
  registerEmployee = '/register-employee/:registrationToken',
  login = '/login',
  dashboard = '/dashboard',
  inventoryCatalog = '/inventory/catalog',
  employeeInvitation = '/employees/invite',
  employeeManagement = '/employees/manage',
}
/**
 * TODO: consider adding mappings conditionally using permissions/features info from state.
 * See `ShellContainer`, `selectIsInventoryFeatureEnabled`, `selectIsEmployeesManagementAllowedToCurrentUser`, etc.
 * Or find another way to guard routes.
 */
const inventoryRoutesMappings: RoutePathComponentMappings = [
  {
    path: AppRouePaths.inventoryCatalog,
    component: InventoryCatalogPageContainer,
  },
];
const employeesRoutesMappings: RoutePathComponentMappings = [
  {
    path: AppRouePaths.employeeInvitation,
    component: EmployeeInvitationPageContainer,
  },
  {
    path: AppRouePaths.employeeManagement,
    component: EmployeeListPageContainer,
  },
];
const allRoutesMappings = [
  {
    path: AppRouePaths.dashboard,
    component: DashboardPage,
  },
  ...inventoryRoutesMappings,
  ...employeesRoutesMappings,
];

export const allInventoryRoutesPaths = inventoryRoutesMappings.map(
  mapping => mapping.path,
);

/**
 * All routes of the app (including sub-features).
 * Consider splitting when there are a lot of routes.
 */
export const appRoutes = (
  <Switch>
    <Redirect from="/" exact={true} to={AppRouePaths.dashboard} />
    <Route
      path={AppRouePaths.registerEmployee}
      component={EmployeeRegistrationPageContainer}
    />
    <Route path={AppRouePaths.login} component={LoginPageContainer} />
    <ShellContainer>
      <Switch>
        {allRoutesMappings.map(mapping => (
          <Route
            key={mapping.path}
            path={mapping.path}
            component={mapping.component}
          />
        ))}
      </Switch>
    </ShellContainer>
  </Switch>
);

type RoutePathComponentMappings = Array<{
  readonly path: AppRouePaths;
  readonly component: React.ComponentType;
}>;
