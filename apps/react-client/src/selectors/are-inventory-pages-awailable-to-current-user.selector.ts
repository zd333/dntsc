import { createSelector } from 'reselect';
import { selectIsInventoryFeatureEnabled } from './is-inventory-feature-enabled.selector';
import { selectUserRoles } from './user-roles.selector';

/**
 * `undefined` means still unknown.
 * There can be some internal restrictions inside pages,
 * see e.g. `selectUpdateAndCreateInventoryItemsIsAllowed`.
 */
export const selectAreInventoryPagesAvailableForCurrentUser = createSelector(
  [selectIsInventoryFeatureEnabled, selectUserRoles],
  (isInventoryFeatureEnabled, userRoles) => {
    if (typeof isInventoryFeatureEnabled === 'undefined') {
      return undefined;
    }
    if (isInventoryFeatureEnabled === false) {
      return false;
    }
    if (!Array.isArray(userRoles)) {
      return undefined;
    }

    return userRoles.some(
      role =>
        role === '_INVENTORY_BALANCE_KEEPER' ||
        role === '_INVENTORY_MASTER' ||
        role === '_CLINIC_OWNER',
    );
  },
);
