import * as React from 'react';
import { ErrorModalContainer } from '../../src/containers/ErrorModalContainer';
import { LoginPageContainer } from '../../src/containers/LoginPageContainer';
import { PatientsManagementPage } from '../sub-features/patients-management/components/PatientsManagementPage';
import { Redirect, Route, Switch } from 'react-router';

const appRootRoutes = (
  <Switch>
    <Redirect from="/" exact={true} to="/patients" />

    <Route path="/login" component={LoginPageContainer} />

    <Route path="/patients" component={PatientsManagementPage} />
  </Switch>
);

export const App = () => (
  <React.Fragment>
    <ErrorModalContainer />
    {appRootRoutes}
  </React.Fragment>
);
