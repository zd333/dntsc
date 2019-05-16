import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { AllEmployeesActions } from './sub-features/employees/actions/employees.actions';
import { AllInventoryActions } from './sub-features/inventory/actions/inventory.actions';
import { AllSessionActions } from './actions/session.actions';
import { App } from './components/App';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { appRootEpics } from './epics';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { CommonErrorAction } from './actions/error-modal.actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { employeesApiConnectors } from './sub-features/employees/api-connectors';
import { employeesEpics } from './sub-features/employees/epics';
import { employeesReducer } from './sub-features/employees/reducers/employees.reducer';
import { EmployeesState } from './sub-features/employees/reducers/employees-state.interface';
import { errorModalReducer } from './reducers/error-modal.reducer';
import { ErrorModalState } from './reducers/error-modal-state.interface';
import { IntlProviderContainer } from './containers/IntlProviderContainer';
import { inventoryApiConnectors } from './sub-features/inventory/api-connectors';
import { inventoryEpics } from './sub-features/inventory/epics';
import { inventoryReducer } from './sub-features/inventory/reducers/inventory.reducer';
import { InventoryState } from './sub-features/inventory/reducers/inventory-state.interface';
import { Provider } from 'react-redux';
import { purple, red } from '@material-ui/core/colors';
import { rootApiConnectors } from './api-connectors';
import { sessionReducer } from './reducers/session.reducer';
import { SessionState } from './reducers/session-state.interface';
import './index.css';
import {
  ConnectedRouter,
  RouterState,
  connectRouter,
  routerMiddleware,
  RouterAction,
} from 'connected-react-router';

const APP_VERSION_GLOBAL_VAR_NAME = 'APP_VERSION';
window[APP_VERSION_GLOBAL_VAR_NAME] = process.env.REACT_APP_VERSION;
// This is for investigating on bugs, etc
/* tslint:disable:no-console */
console.info(`App version: ${process.env.REACT_APP_VERSION}`);

if (process.env.NODE_ENV === 'production' && process.env.REACT_APP_SENTRY_KEY) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_KEY,
    release: process.env.REACT_APP_VERSION,
  });
}

const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  session: sessionReducer,
  errorModal: errorModalReducer,
  inventory: inventoryReducer,
  employees: employeesReducer,
});
const rootEpic = combineEpics(
  ...appRootEpics,
  ...inventoryEpics,
  ...employeesEpics,
);
const rootEpicMiddlewareDependencies = {
  ...rootApiConnectors,
  ...inventoryApiConnectors,
  ...employeesApiConnectors,
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
    secondary: red,
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
  readonly inventory: InventoryState;
  readonly employees: EmployeesState;
}
/**
 * Type of object that collects all injected into epic middleware dependencies of the App.
 */
export type AppEpicsDependencies = typeof rootEpicMiddlewareDependencies;

/**
 * Union type of all app actions.
 * !Router actions have different type nature, thus must be processed in epics slightly differently,
 * ! use `ofType` from `redux-observable` library for router actions
 * !and `ofType` from `@martin_hotell/rex-tils` for all other actions.
 */
export type AllAppActions =
  | RouterAction
  | AllSessionActions
  | CommonErrorAction
  | AllInventoryActions
  | AllEmployeesActions;
