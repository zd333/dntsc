import { createSelector } from 'reselect';
import { selectIsInventoryFeatureEnabled } from './is-inventory-feature-enabled.selector';
import { selectUserIsLoggedIn } from './user-is-logged-in.selector';
import { selectUserRoles } from './user-roles.selector';

/**
 * There can be some internal restrictions inside pages,
 * see e.g. `selectUpdateAndCreateInventoryItemsIsAllowed`.
 */
export const selectAreInventoryPagesAvailableForCurrentUser = createSelector(
  [selectIsInventoryFeatureEnabled, selectUserIsLoggedIn, selectUserRoles],
  (isInventoryFeatureEnabled, userIsLoggedIn, userRoles) =>
    !!isInventoryFeatureEnabled &&
    !!userIsLoggedIn &&
    userRoles.some(
      role =>
        role === '_INVENTORY_BALANCE_KEEPER' ||
        role === '_INVENTORY_MASTER' ||
        role === '_CLINIC_OWNER',
    ),
);
