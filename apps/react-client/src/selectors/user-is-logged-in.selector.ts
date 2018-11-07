import { RootState } from 'src';

export const selectUserIsLoggedIn = (state: RootState) =>
  !!state && !!state.session && !!state.session.isLoggedIn;
