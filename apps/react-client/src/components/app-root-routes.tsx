import * as React from 'react';
import { DashboardPage } from '../sub-features/dashboard/components/DashboardPage';
import { InventoryRoot } from '../sub-features/inventory/components/InventoryRoot';
import { LoginPageContainer } from '../containers/LoginPageContainer';
import { PatientsManagementPage } from '../sub-features/patients-management/components/PatientsManagementPage';
import { Redirect, Route, Switch } from 'react-router';
import { ShellContainer } from '../containers/ShellContainer';

// TODO: move to app component
export const appRootRoutes = (
  <Switch>
    <Redirect from="/" exact={true} to="/dashboard" />
    <Route path="/login" component={LoginPageContainer} />
    <ShellContainer>
      <Route path="/dashboard" component={DashboardPage} />
      {/* TODO: add inventory page */}

      <Route path="/inventory" component={InventoryRoot} />
      {/* <Route path="/inventory">
        <Redirect from="/" exact={true} to="/catalogs" />
        <Route path="/catalog" component={StyledInventoryCatalogPage} />
      </Route> */}
      <Route path="/patients" component={PatientsManagementPage} />
    </ShellContainer>
  </Switch>
);
