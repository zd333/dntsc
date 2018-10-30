import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Provider } from 'react-redux';
import { RootContainer } from './containers/RootContainer';
import { Store } from 'redux';

// TODO: define routes https://github.com/supasate/connected-react-router/blob/master/examples/typescript/src/routes/index.tsx

export const App = ({ history, store }: AppProps) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <RootContainer />
    </ConnectedRouter>
  </Provider>
);

// TODO: type store
interface AppProps {
  history: History;
  store: Store;
}
