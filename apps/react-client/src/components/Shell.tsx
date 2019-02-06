import * as React from 'react';
import { HeaderContainer } from '../containers/HeaderContainer';
import { LeftNav } from './LeftNav';

// TODO: add navOpened state

// This value is used in left nav (drawer) and in header (app bar)
export const LEFT_NAV_WIDTH = 240;

export const Shell: React.SFC = () => {
  return (
    <div>
      <HeaderContainer />
      <LeftNav />
      {/* TODO: main content (pages) go here */}
    </div>
  );
};
