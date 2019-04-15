import { createSelector } from 'reselect';
import { selectUserIsLoggedIn } from './user-is-logged-in.selector';
import { selectUserRoles } from './user-roles.selector';

export const selectIsEmployeesManagementAllowedToCurrentUser = createSelector(
  [selectUserIsLoggedIn, selectUserRoles],
  (userIsLoggedIn, userRoles) =>
    userIsLoggedIn &&
    userRoles.some(
      role =>
        role === '_HR' ||
        role === '_CLINIC_OWNER' ||
        role === '_PLATFORM_OWNER',
    ),
);
