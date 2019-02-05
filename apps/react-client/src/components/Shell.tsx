import * as React from 'react';
import { Header } from './Header';
import { LeftNav } from './LeftNav';

// TODO: add styles
export const Shell: React.SFC = () => {
  return (
    <div>
      <Header />
      <LeftNav />
      {/* TODO: main content (pages) go here */}
    </div>
  );
};
