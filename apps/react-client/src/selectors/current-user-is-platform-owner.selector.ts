import { createSelector } from 'reselect';
import { selectUserIsLoggedIn } from './user-is-logged-in.selector';
import { selectUserRoles } from './user-roles.selector';

export const selectCurrentUserIsPlatformOwner = createSelector(
  [selectUserIsLoggedIn, selectUserRoles],
  (userIsLoggedIn, userRoles) =>
    userIsLoggedIn && userRoles.some(role => role === '_PLATFORM_OWNER'),
);
