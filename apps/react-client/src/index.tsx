import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { App } from './App';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
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
const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(applyMiddleware(routerMiddleware(history))),
);

ReactDOM.render(
  <App history={history} store={store} />,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();

export interface AppState {
  readonly session: SessionState;
  readonly router: RouterState;
}
