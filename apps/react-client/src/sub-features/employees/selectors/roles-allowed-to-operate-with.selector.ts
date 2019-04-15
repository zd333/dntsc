import { AppAccessRoles } from '@api/app-access-roles';
import { createSelector } from 'reselect';
import { selectUserRoles } from '../../../selectors/user-roles.selector';

/**
 * All permissions that make sense from client app prospective.
 * Do not include `_PLATFORM_OWNER` and `_BASIC_PERMISSIONS` because client app never operates
 * with those roles directly.
 * ! This must be synced with `allAppAccessRoles` of API app!
 */
export const allOperableAccessRoles: Array<AppAccessRoles> = [
  '_CLINIC_OWNER',
  '_HR',
  '_INVENTORY_MASTER',
  '_INVENTORY_BALANCE_KEEPER',
];

export const selectRolesAllowedToOperateWith = createSelector(
  [selectUserRoles],
  userRoles => {
    if (!Array.isArray(userRoles)) {
      return [];
    }

    if (userRoles.some(role => role === '_PLATFORM_OWNER')) {
      // Platform owner is allowed to create any role in clinic
      return allOperableAccessRoles.filter(role => role !== '_PLATFORM_OWNER');
    }

    if (userRoles.some(role => role === '_CLINIC_OWNER' || role === '_HR')) {
      // Clinic owners and HRs can create any role except new clinic owners
      return allOperableAccessRoles.filter(
        role => role !== '_PLATFORM_OWNER' && role !== '_CLINIC_OWNER',
      );
    }

    return [];
  },
);
