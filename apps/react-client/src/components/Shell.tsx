import * as React from 'react';
import { AppLanguages } from '../reducers/session-state.interface';
import { Header, HeaderProps } from './Header';
import { MainMenu, MainMenuProps } from './MainMenu';

// TODO: add navOpened state and handler

// This value is used in main menu (drawer) and in header (app bar)
export const MAIN_MENU_WIDTH = 240;
const languageOptions: Array<AppLanguages> = Object.keys(AppLanguages).map(
  key => AppLanguages[key],
);

export type ShellProps = Pick<
  HeaderProps,
  Exclude<keyof HeaderProps, 'languageOptions' | 'onMenuClick'>
> &
  Pick<MainMenuProps, Exclude<keyof MainMenuProps, 'mobileOpened'>>;

interface ShellState {
  readonly mobileOpened: boolean;
}

export class Shell extends React.Component<ShellProps, ShellState> {
  public state = {
    mobileOpened: false,
  };

  public toggleMenu = () => {
    this.setState((previousState: ShellState) => ({
      mobileOpened: !previousState.mobileOpened,
    }));
  };

  public render(): JSX.Element {
    const {
      title,
      currentLanguage,
      onLanguageChange,
      onLogout,
      isInventoryEnabled,
    } = this.props;

    return (
      <div>
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
        {/* TODO: main content (pages) go here */}
      </div>
    );
  }
}
