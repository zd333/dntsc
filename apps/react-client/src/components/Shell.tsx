import * as React from 'react';
import { AppLanguages } from '../reducers/session-state.interface';
import { Header, HeaderProps } from './Header';
import { MainMenu, MainMenuProps } from './MainMenu';

// TODO: add navOpened state and handler

// This value is used in left nav (drawer) and in header (app bar)
export const LEFT_NAV_WIDTH = 240;
const languageOptions: Array<AppLanguages> = Object.keys(AppLanguages).map(
  key => AppLanguages[key],
);

export type ShellProps = Pick<
  HeaderProps,
  Exclude<keyof HeaderProps, 'languageOptions'>
> &
  Pick<MainMenuProps, Exclude<keyof MainMenuProps, 'mobileOpened'>>;

interface ShellState {
  readonly mobileOpened: boolean;
}

export class Shell extends React.Component<ShellProps, ShellState> {
  public state = {
    mobileOpened: false,
  };

  public render(): JSX.Element {
    const {
      title,
      currentLanguage,
      onMenuClick,
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
          onMenuClick={onMenuClick}
          onLanguageChange={onLanguageChange}
          onLogout={onLogout}
        />
        <MainMenu
          mobileOpened={this.state.mobileOpened}
          isInventoryEnabled={isInventoryEnabled}
        />
        {/* TODO: main content (pages) go here */}
      </div>
    );
  }
}
