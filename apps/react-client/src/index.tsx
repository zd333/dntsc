import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AllEmployeesActions } from './sub-features/employees/actions/amployees.actions';
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
import { green, purple } from '@material-ui/core/colors';
import { IntlProviderContainer } from './containers/IntlProviderContainer';
import { inventoryApiConnectors } from './sub-features/inventory/api-connectors';
import { inventoryEpics } from './sub-features/inventory/epics';
import { inventoryReducer } from './sub-features/inventory/reducers/inventory.reducer';
import { InventoryState } from './sub-features/inventory/reducers/inventory-state.interface';
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
  RouterAction,
} from 'connected-react-router';

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
