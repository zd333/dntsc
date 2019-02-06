import * as React from 'react';
import { DashboardPage } from '../sub-features/dashboard/components/DashboardPage';
import { LoginPageContainer } from '../containers/LoginPageContainer';
import { Redirect, Route, Switch } from 'react-router';
import { ShellContainer } from '../containers/ShellContainer';

export const appRootRoutes = (
  <Switch>
    <Redirect from="/" exact={true} to="/dashboard" />
    <Route path="/login" component={LoginPageContainer} />
    <Route component={ShellContainer}>
      <Route path="/dashboard" component={DashboardPage} />
      {/* <Route path="/patients" component={PatientsManagementPage} /> */}
    </Route>
  </Switch>
);
