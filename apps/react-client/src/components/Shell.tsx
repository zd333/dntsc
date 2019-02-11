import * as React from 'react';
import { AppLanguages } from '../reducers/session-state.interface';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import { Header, HeaderProps } from './Header';
import { MainMenu, MainMenuProps } from './MainMenu';

// This value is used in main menu (drawer) and in header (app bar)
export const MAIN_MENU_WIDTH = 300;
const languageOptions: Array<AppLanguages> = Object.keys(AppLanguages).map(
  key => AppLanguages[key],
);

export type ShellProps = {
  readonly routePath: string;
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
          {children}
        </main>
      </div>
    );
  }
}

const shellStyles = ({ spacing, mixins }: Theme) =>
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
      padding: spacing.unit * 3,
    },
  });

type StyledShellProps = ShellProps & WithStyles<typeof shellStyles>;

export const Shell = withStyles(shellStyles)(StyledShell);
