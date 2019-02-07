import { createSelector } from 'reselect';
import { selectAvailableFeatures } from './available-features.selector';
import { selectUserIsLoggedIn } from './user-is-logged-in.selector';
import { selectUserRoles } from './user-roles.selector';
// import { PlatformFeatures } from '@api/sub-features/tenants/db-schemas/tenant.db-schema';
// TODO: finish
export const selectIsInventoryFeatureEnabled = createSelector(
  [selectUserIsLoggedIn, selectUserRoles, selectAvailableFeatures],
  (userIsLoggedIn, userRoles, availableFeatures) =>
    userIsLoggedIn &&
    // availableFeatures.some(feature => feature === PlatformFeatures.inventory) &&
    userRoles.some(
      role =>
        role === '_INVENTORY_BALANCE_KEEPER' ||
        role === '_INVENTORY_MASTER' ||
        role === '_CLINIC_OWNER' ||
        role === '_PLATFORM_OWNER',
    ),
);
