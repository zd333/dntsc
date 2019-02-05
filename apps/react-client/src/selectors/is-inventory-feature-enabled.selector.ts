import { AppAccessRoles } from '../../../api/src/app-access-roles';
import { createSelector } from 'reselect';
import { PlatformFeatures } from '../../../api/src/sub-features/tenants/db-schemas/tenant.db-schema';
import { selectAvailableFeatures } from './available-features.selector';
import { selectUserIsLoggedIn } from './user-is-logged-in.selector';
import { selectUserRoles } from './user-roles.selector';

export const selectIsInventoryFeatureEnabled = createSelector(
  [selectUserIsLoggedIn, selectUserRoles, selectAvailableFeatures],
  (userIsLoggedIn, userRoles, availableFeatures) =>
    userIsLoggedIn &&
    availableFeatures.some(feature => feature === PlatformFeatures.inventory) &&
    userRoles.some(
      role =>
        role === AppAccessRoles._INVENTORY_BALANCE_KEEPER ||
        role === AppAccessRoles._INVENTORY_MASTER ||
        role === AppAccessRoles._CLINIC_OWNER ||
        role === AppAccessRoles._PLATFORM_OWNER,
    ),
);
