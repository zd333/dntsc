import * as React from 'react';
import { AppRoutesContainer } from '../containers/AppRoutesContainer';
import { CssBaseline } from '@material-ui/core';
import { ErrorModalContainer } from '../../src/containers/ErrorModalContainer';

export const App: React.FunctionComponent = () => (
  <React.Fragment>
    <ErrorModalContainer />
    <CssBaseline />
    <AppRoutesContainer />
  </React.Fragment>
);
