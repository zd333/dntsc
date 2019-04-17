import * as React from 'react';
import { appRoutes } from './app-routes';
import { CssBaseline } from '@material-ui/core';
import { ErrorModalContainer } from '../../src/containers/ErrorModalContainer';

export const App: React.FunctionComponent = () => (
  <React.Fragment>
    <ErrorModalContainer />
    <CssBaseline />
    {appRoutes}
  </React.Fragment>
);
