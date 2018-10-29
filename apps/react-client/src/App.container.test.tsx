import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from './App.container';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
