import * as React from 'react';
import { DashboardPage } from '../sub-features/dashboard/components/DashboardPage';
import { InventoryCatalogPageContainer } from '../sub-features/inventory/containers/InventoryCatalogPageContainer';
import { LoginPageContainer } from '../containers/LoginPageContainer';
import { Redirect, Route, Switch } from 'react-router';
import { ShellContainer } from '../containers/ShellContainer';

export enum AppRouePaths {
  login = '/login',
  dashboard = '/dashboard',
  inventoryCatalog = '/inventory/catalog',
}

const inventoryRoutes = (
  <Route
    path={AppRouePaths.inventoryCatalog}
    component={InventoryCatalogPageContainer}
  />
);

/**
 * All routes of the app (including sub-features).
 * Consider splitting when there are a lot of routes.
 */
export const appRoutes = (
  <Switch>
    <Redirect from="/" exact={true} to={AppRouePaths.dashboard} />
    <Route path={AppRouePaths.login} component={LoginPageContainer} />
    <ShellContainer>
      <Switch>
        <Route path={AppRouePaths.dashboard} component={DashboardPage} />
        {inventoryRoutes}
      </Switch>
    </ShellContainer>
  </Switch>
);
