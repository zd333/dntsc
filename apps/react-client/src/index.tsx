import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { appRootEpics } from './epics';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { errorModalReducer } from './reducers/error-modal.reducer';
import { ErrorModalState } from './reducers/error-modal-state.interface';
import { green, purple } from '@material-ui/core/colors';
import { IntlProviderContainer } from './containers/IntlProviderContainer';
import { Provider } from 'react-redux';
import { rootApiConnectors } from './api-connectors';
import { sessionReducer } from './reducers/session.reducer';
import { SessionState } from './reducers/session-state.interface';
import './index.css';
import {
  createMuiTheme,
  MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import {
  ConnectedRouter,
  RouterState,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';
// TODO: un-comment or get rid of it
/* tslint:disable-next-line */
// import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();
const rootReducer = combineReducers({
  session: sessionReducer,
  errorModal: errorModalReducer,
});
const rootEpic = combineEpics(...appRootEpics);
const rootEpicMiddlewareDependencies = { ...rootApiConnectors };
const epicMiddleware = createEpicMiddleware({
  dependencies: rootEpicMiddlewareDependencies,
});
// Take care of sanitization or disabling dev tools on prod
const store = createStore(
  connectRouter(history)(rootReducer),
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
    <ConnectedRouter history={history}>
      <IntlProviderContainer>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </IntlProviderContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
// TODO: un-comment or get rid of it
/* tslint:disable-next-line */
// registerServiceWorker();

/**
 * State of the whole App.
 */
export interface RootState {
  readonly session: SessionState;
  readonly router: RouterState;
  readonly errorModal: ErrorModalState;
}
export type RootEpiMiddlewareDependencies = typeof rootEpicMiddlewareDependencies;
