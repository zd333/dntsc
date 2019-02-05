import * as React from 'react';
import { DashboardPage } from '../sub-features/dashboard/components/DashboardPage';
import { ErrorModalContainer } from '../../src/containers/ErrorModalContainer';
import { LoginPageContainer } from '../../src/containers/LoginPageContainer';
import { Redirect, Route, Switch } from 'react-router';
import { Shell } from './Shell';

const appRootRoutes = (
  <Switch>
    <Redirect from="/" exact={true} to="/dashboard" />
    <Route path="/login" component={LoginPageContainer} />
    <Route component={Shell}>
      <Route path="/dashboard" component={DashboardPage} />
      {/* <Route path="/patients" component={PatientsManagementPage} /> */}
    </Route>
  </Switch>
);

export const App = () => (
  <React.Fragment>
    <ErrorModalContainer />
    {appRootRoutes}
  </React.Fragment>
);
