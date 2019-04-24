import { createSelector } from 'reselect';
import { selectIsInventoryFeatureEnabled } from '../../../selectors/is-inventory-feature-enabled.selector';
import { selectUserRoles } from '../../../selectors/user-roles.selector';

export const selectUpdateAndCreateInventoryItemsIsAllowed = createSelector(
  [selectIsInventoryFeatureEnabled, selectUserRoles],
  (isInventoryFeatureEnabled, userRoles) =>
    isInventoryFeatureEnabled &&
    userRoles.some(
      role => role === '_INVENTORY_MASTER' || role === '_CLINIC_OWNER',
    ),
);
