import * as React from 'react';
import { ErrorModalContainer } from '../../src/containers/ErrorModalContainer';
import { LoginPageContainer } from '../../src/containers/LoginPageContainer';
import { PatientsManagementPage } from '../sub-features/patients-management/components/PatientsManagementPage';
import { Route, Switch } from 'react-router';

const appRootRoutes = (
  <Switch>
    <Route exact={true} path="/" component={PatientsManagementPage} />
    <Route path="/login" component={LoginPageContainer} />
  </Switch>
);

export const App = () => (
  <React.Fragment>
    <ErrorModalContainer />
    {appRootRoutes}
  </React.Fragment>
);
