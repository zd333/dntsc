import { createSelector } from 'reselect';
import { selectAvailableFeatures } from './available-features.selector';
import { selectUserIsLoggedIn } from './user-is-logged-in.selector';
import { selectUserRoles } from './user-roles.selector';

export const selectIsInventoryFeatureEnabled = createSelector(
  [selectUserIsLoggedIn, selectUserRoles, selectAvailableFeatures],
  (userIsLoggedIn, userRoles, availableFeatures) =>
    !!userIsLoggedIn &&
    Array.isArray(availableFeatures) &&
    availableFeatures.some(feature => feature === 'INVENTORY') &&
    userRoles.some(
      role =>
        role === '_INVENTORY_BALANCE_KEEPER' ||
        role === '_INVENTORY_MASTER' ||
        role === '_CLINIC_OWNER',
    ),
);
