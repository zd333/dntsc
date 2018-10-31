import * as React from 'react';
import { LoginPage } from './LoginPage';
import { PatientsManagementPage } from '../sub-features/patients-management/components/PatientsManagementPage';
import { Route, Switch } from 'react-router';

const appRootRoutes = (
  <Switch>
    <Route exact={true} path="/" component={PatientsManagementPage} />
    <Route path="/login" component={LoginPage} />
  </Switch>
);

export const App = () => <div>{appRootRoutes}</div>;
