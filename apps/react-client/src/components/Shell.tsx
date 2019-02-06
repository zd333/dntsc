import * as React from 'react';
import { AppLanguages } from '../reducers/session-state.interface';
import { Header, HeaderProps } from './Header';
import { MainMenu } from './MainMenu';

// TODO: add navOpened state and handler

// This value is used in left nav (drawer) and in header (app bar)
export const LEFT_NAV_WIDTH = 240;
const languageOptions: Array<AppLanguages> = Object.keys(AppLanguages).map(
  key => AppLanguages[key],
);

// TODO: merge with menu props
export type ShellProps = Pick<
  HeaderProps,
  Exclude<keyof HeaderProps, 'languageOptions'>
>;

export const Shell: React.SFC<ShellProps> = props => {
  const {
    title,
    currentLanguage,
    onMenuClick,
    onLanguageChange,
    onLogout,
  } = props;

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
      <MainMenu />
      {/* TODO: main content (pages) go here */}
    </div>
  );
};
