import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { App } from './components/App';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { appRootEpics } from './epics';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { green, purple } from '@material-ui/core/colors';
import { IntlProviderContainer } from './containers/IntlProviderContainer';
import { Provider } from 'react-redux';
import { sessionReducer } from './reducers/session.reducer';
import { SessionState } from './reducers/session-state.interface';
import './index.css';
import {
  createMuiTheme,
  MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import {
  RouterState,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router';

const history = createBrowserHistory();
const rootReducer = combineReducers({
  session: sessionReducer,
});
const rootEpic = combineEpics(...appRootEpics);
const epicMiddleware = createEpicMiddleware();
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
registerServiceWorker();

/**
 * State of the App.
 */
export interface RootState {
  readonly session: SessionState;
  readonly router: RouterState;
}
