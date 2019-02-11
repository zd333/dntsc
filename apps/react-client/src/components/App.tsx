import * as React from 'react';
import { appRootRoutes } from './app-root-routes';
import { CssBaseline } from '@material-ui/core';
import { ErrorModalContainer } from '../../src/containers/ErrorModalContainer';

export const App: React.SFC = () => (
  <React.Fragment>
    <ErrorModalContainer />
    <CssBaseline />
    {appRootRoutes}
  </React.Fragment>
);
