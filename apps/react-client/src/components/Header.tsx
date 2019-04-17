import * as React from 'react';
import { AppLanguages } from '../reducers/session-state.interface';
import { ExitToApp, Menu } from '@material-ui/icons';
import { MAIN_MENU_WIDTH } from './Shell';
import {
  AppBar,
  Toolbar,
  Typography,
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  IconButton,
  FormControl,
  Select,
  MenuItem,
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

const StyledHeader: React.FunctionComponent<StyledHeaderProps> = props => {
  const {
    classes,
    title,
    languageOptions,
    currentLanguage,
    onMenuClick,
    onLanguageChange,
    onLogout,
  } = props;
  const languageOptionElements = (languageOptions || []).map(option => (
    <MenuItem value={option} key={option}>
      {option}
    </MenuItem>
  ));
  const handleLanguageSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onLanguageChange({ language: event.target.value as AppLanguages });
  };

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
          {title}
        </Typography>

        <FormControl className={classes.formControl}>
          <Select
            value={currentLanguage}
            onChange={handleLanguageSelectChange}
            displayEmpty
            name="language"
          >
            {languageOptionElements}
          </Select>
        </FormControl>

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

const headerStyles = ({ breakpoints, spacing }: Theme) =>
  createStyles({
    appBar: {
      marginLeft: MAIN_MENU_WIDTH,
      [breakpoints.up('sm')]: {
        width: `calc(100% - ${MAIN_MENU_WIDTH}px)`,
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
    formControl: {
      margin: spacing.unit,
      minWidth: 50,
    },
  });

type StyledHeaderProps = HeaderProps & WithStyles<typeof headerStyles>;

export const Header = withStyles(headerStyles)(React.memo(StyledHeader));
