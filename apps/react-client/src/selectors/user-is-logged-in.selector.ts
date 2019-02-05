import { createSelector } from 'reselect';
import { selectAuthToken } from './auth-token.selector';

export const selectUserIsLoggedIn = createSelector(
  [selectAuthToken],
  authToken => !!authToken,
);
