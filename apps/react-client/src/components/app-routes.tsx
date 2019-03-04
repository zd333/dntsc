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

const inventoryRoutesMappings: RoutePathComponentMappings = [
  {
    path: AppRouePaths.inventoryCatalog,
    component: InventoryCatalogPageContainer,
  },
];
export const inventoryRoutesPaths = inventoryRoutesMappings.map(
  mapping => mapping.path,
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
        {inventoryRoutesMappings.map(mapping => (
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
