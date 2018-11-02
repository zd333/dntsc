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
import { Provider } from 'react-redux';
import { sessionReducer, SessionState } from './reducers/session.reducer';
import './index.css';
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

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();

export interface AppState {
  readonly session: SessionState;
  readonly router: RouterState;
}
