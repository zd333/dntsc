import * as React from 'react';

export interface MainMenuProps {
  readonly mobileOpened: boolean;
  readonly isInventoryEnabled: boolean;
}
// TODO: finish
export const MainMenu: React.SFC<MainMenuProps> = props => {
  const { mobileOpened } = props;

  return <div>Main menu {mobileOpened}</div>;
};
