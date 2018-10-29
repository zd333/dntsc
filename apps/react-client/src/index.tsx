import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from './App.container';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
