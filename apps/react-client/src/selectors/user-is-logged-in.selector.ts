import { AppState } from 'src';

export const selectUserIsLoggedIn = (state: AppState) =>
  !!state && !!state.session && !!state.session.isLoggedIn;
