import * as React from 'react';
import { appRootRoutes } from './app-root-routes';
import { ErrorModalContainer } from '../../src/containers/ErrorModalContainer';
import {
  createStyles,
  WithStyles,
  withStyles,
  CssBaseline,
} from '@material-ui/core';

const StyledApp: React.SFC<AppProps> = props => (
  <React.Fragment>
    <ErrorModalContainer />
    <div className={props.classes.root}>
      <CssBaseline />
      {appRootRoutes}
    </div>
  </React.Fragment>
);

const appStyles = () =>
  createStyles({
    root: {
      display: 'flex',
    },
  });

type AppProps = WithStyles<typeof appStyles>;

export const App = withStyles(appStyles)(StyledApp);
