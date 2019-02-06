import * as React from 'react';
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

// TODO: add language selection support
export interface HeaderProps {
  readonly title: string;
  readonly onLogout: () => void;
  readonly onMenuClick: () => void;
}

const StyledHeader: React.SFC<StyledHeaderProps> = props => {
  const { classes, title, onLogout, onMenuClick } = props;

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <IconButton
        color="inherit"
        aria-label="Toggle menu"
        onClick={onMenuClick}
        className={classes.menuButton}
      >
        <Menu />
      </IconButton>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
      </Toolbar>
      <IconButton
        color="inherit"
        aria-label="Logout"
        onClick={onLogout}
        className={classes.logoutButton}
      >
        <ExitToApp />
      </IconButton>
    </AppBar>
  );
};

// TODO: make mobile friendly
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
  });

type StyledHeaderProps = HeaderProps & WithStyles<typeof headerStyles>;

export const Header = withStyles(headerStyles)(StyledHeader);
