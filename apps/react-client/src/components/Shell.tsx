import * as React from 'react';
import { AppLanguages } from '../reducers/session-state.interface';
import { Header, HeaderProps } from './Header';
import { MainMenu, MainMenuProps } from './MainMenu';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  CircularProgress,
  Backdrop,
} from '@material-ui/core';

// This value is used in main menu (drawer) and in header (app bar)
export const MAIN_MENU_WIDTH = 300;
// Default value from material ui lib
const SPINNER_WIDTH = 40;
const BUSY_ANIMATION_TIMEOUT = 1000;

const languageOptions: Array<AppLanguages> = Object.keys(AppLanguages).map(
  key => AppLanguages[key],
);

export type ShellProps = {
  /**
   * Need route path just to toggle main menu on mobile when it changes.
   */
  readonly routePath: string;
  readonly isBusy: boolean;
} & Pick<
  HeaderProps,
  Exclude<keyof HeaderProps, 'languageOptions' | 'onMenuClick'>
> &
  Pick<MainMenuProps, Exclude<keyof MainMenuProps, 'mobileOpened'>>;

interface ShellState {
  readonly mobileOpened: boolean;
  readonly savedPath: string;
}

export class StyledShell extends React.Component<StyledShellProps, ShellState> {
  public state = {
    mobileOpened: false,
    savedPath: this.props.routePath,
  };

  public toggleMenu = () => {
    this.setState((previousState: ShellState) => ({
      mobileOpened: !previousState.mobileOpened,
    }));
  };

  public componentWillReceiveProps(nextProps: StyledShellProps): void {
    // Close menu on nav
    if (nextProps && nextProps.routePath !== this.state.savedPath) {
      this.state.savedPath = nextProps.routePath;
      this.setState((previousState: ShellState) => ({
        mobileOpened: false,
      }));
    }
  }

  public render(): JSX.Element {
    const {
      isBusy,
      classes,
      title,
      currentLanguage,
      onLanguageChange,
      onLogout,
      isInventoryEnabled,
      children,
    } = this.props;

    return (
      <div className={classes.root}>
        <Header
          title={title}
          languageOptions={languageOptions}
          currentLanguage={currentLanguage}
          onMenuClick={this.toggleMenu}
          onLanguageChange={onLanguageChange}
          onLogout={onLogout}
        />

        <MainMenu
          mobileOpened={this.state.mobileOpened}
          isInventoryEnabled={isInventoryEnabled}
          onClose={this.toggleMenu}
        />

        {/* Main content (page component) */}
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Backdrop
            open={isBusy}
            classes={{ root: classes.backdropOverlay }}
            transitionDuration={{
              enter: BUSY_ANIMATION_TIMEOUT,
              exit: 0,
            }}
          />

          {isBusy && <CircularProgress className={classes.spinner} />}

          {children}
        </main>
      </div>
    );
  }
}

const shellStyles = ({ spacing, mixins, palette }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: mixins.toolbar,
    drawerPaper: {
      width: MAIN_MENU_WIDTH,
    },
    content: {
      flexGrow: 1,
      minHeight: '100vh',
      position: 'relative',
      padding: spacing.unit * 3,
    },
    spinner: {
      position: 'absolute',
      top: `calc(50vh - ${SPINNER_WIDTH / 2}px)`,
      left: `calc(50% - ${SPINNER_WIDTH / 2}px)`,
    },
    backdropOverlay: {
      zIndex: 1099,
      // Do not use palette because there is no suitable grey with opacity and this is single usage of this color
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });

type StyledShellProps = ShellProps & WithStyles<typeof shellStyles>;

export const Shell = withStyles(shellStyles)(StyledShell);
