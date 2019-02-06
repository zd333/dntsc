import * as React from 'react';
import { AppLanguages } from '../reducers/session-state.interface';
import { ExitToApp, Menu } from '@material-ui/icons';
import { LEFT_NAV_WIDTH } from './Shell';
import {
  AppBar,
  Toolbar,
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  IconButton,
} from '@material-ui/core';

export interface HeaderProps {
  readonly title: string;
  readonly languageOptions: Array<AppLanguages>;
  readonly currentLanguage: AppLanguages;
  readonly onMenuClick: () => void;
  readonly onLanguageChange: (params: {
    readonly language: AppLanguages;
  }) => void;
  readonly onLogout: () => void;
}
// TODO: add language selection support

const StyledHeader: React.SFC<StyledHeaderProps> = props => {
  const { classes, title, onLogout, onMenuClick } = props;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open menu"
          onClick={onMenuClick}
          className={classes.menuButton}
        >
          <Menu />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {' '}
          {title}
        </Typography>
        <IconButton
          color="inherit"
          aria-label="Logout"
          onClick={onLogout}
          className={classes.logoutButton}
        >
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

// TODO: make mobile friendly?
const headerStyles = ({ breakpoints }: Theme) =>
  createStyles({
    appBar: {
      marginLeft: LEFT_NAV_WIDTH,
      [breakpoints.up('sm')]: {
        width: `calc(100% - ${LEFT_NAV_WIDTH}px)`,
      },
    },
    logoutButton: {
      marginRight: 20,
    },
    menuButton: {
      marginRight: 20,
      [breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    title: {
      flexGrow: 1,
    },
  });

type StyledHeaderProps = HeaderProps & WithStyles<typeof headerStyles>;

export const Header = withStyles(headerStyles)(StyledHeader);
