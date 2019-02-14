import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { appRootEpics } from './epics';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { errorModalReducer } from './reducers/error-modal.reducer';
import { ErrorModalState } from './reducers/error-modal-state.interface';
import { green, purple } from '@material-ui/core/colors';
import { IntlProviderContainer } from './containers/IntlProviderContainer';
import { inventoryReducer } from './sub-features/inventory/reducers/inventory.reducer';
import { Provider } from 'react-redux';
import { rootApiConnectors } from './api-connectors';
import { sessionReducer } from './reducers/session.reducer';
import { SessionState } from './reducers/session-state.interface';
import './index.css';
import {
  ConnectedRouter,
  RouterState,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';

const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  session: sessionReducer,
  errorModal: errorModalReducer,
  inventory: inventoryReducer,
});
const rootEpic = combineEpics(...appRootEpics);
const rootEpicMiddlewareDependencies = {
  ...rootApiConnectors,
  // DI local storage into epics to make testing easier (hope there will be tests someday :) )
  localStorageService: window.localStorage,
};
const epicMiddleware = createEpicMiddleware({
  dependencies: rootEpicMiddlewareDependencies,
});
// Take care of sanitization or disabling dev tools on prod
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), epicMiddleware),
  ),
);
const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  typography: {
    useNextVariants: true,
  },
});

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <IntlProviderContainer>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ConnectedRouter>
    </IntlProviderContainer>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);

/**
 * State of the whole App.
 */
export interface RootState {
  readonly session: SessionState;
  readonly router: RouterState;
  readonly errorModal: ErrorModalState;
}
/**
 * Type of object that collects all injected into epic middleware dependencies of the Appp.
 */
export type AppEpicsDependencies = typeof rootEpicMiddlewareDependencies;
