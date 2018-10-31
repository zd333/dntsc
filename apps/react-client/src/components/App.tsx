import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { LoginPage } from './LoginPage';
import { PatientsManagementPage } from '../sub-features/patients-management/components/PatientsManagementPage';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { Store } from 'redux';

const appRootRoutes = (
  <Switch>
    <Route exact={true} path="/" component={PatientsManagementPage} />
    <Route path="/login" component={LoginPage} />
  </Switch>
);

export const App = ({ history, store }: AppProps) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>{appRootRoutes}</div>
    </ConnectedRouter>
  </Provider>
);

// TODO: type store?
interface AppProps {
  history: History;
  store: Store;
}
