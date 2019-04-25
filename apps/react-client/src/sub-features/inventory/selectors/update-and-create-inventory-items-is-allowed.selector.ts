import { createSelector } from 'reselect';
import { selectIsInventoryFeatureEnabled } from '../../../selectors/is-inventory-feature-enabled.selector';
import { selectUserRoles } from '../../../selectors/user-roles.selector';

/**
 * `undefined` means still unknown.
 */
export const selectUpdateAndCreateInventoryItemsIsAllowed = createSelector(
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
      role => role === '_INVENTORY_MASTER' || role === '_CLINIC_OWNER',
    );
  },
);
