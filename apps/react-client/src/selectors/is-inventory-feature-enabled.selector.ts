import { createSelector } from 'reselect';
import { selectAvailableFeatures } from './available-features.selector';

/**
 * `undefined` means still unknown.
 */
export const selectIsInventoryFeatureEnabled = createSelector(
  [selectAvailableFeatures],
  availableFeatures =>
    Array.isArray(availableFeatures)
      ? availableFeatures.some(feature => feature === 'INVENTORY')
      : undefined,
);
