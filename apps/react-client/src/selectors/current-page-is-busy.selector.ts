import { AppRouePaths } from '../components/app-routes';
import { createSelector } from 'reselect';
import { selectInventoryCatalogPageIsBusy } from '../sub-features/inventory/selectors/inventory-catalog-page-is-busy.selector';
import { selectLoginPageIsBusy } from './login-page-is-busy.selector';
import { selectRoutePath } from './route-path.selector';

/**
 * Make sure you add case here for every new app page.
 */
export const selectCurrentPageIsBusy = createSelector(
  [selectRoutePath, selectLoginPageIsBusy, selectInventoryCatalogPageIsBusy],
  (routePath, loginPageIsBusy, inventoryCatalogPageIsBusy) => {
    switch (routePath) {
      case AppRouePaths.login: {
        return loginPageIsBusy;
      }
      case AppRouePaths.inventoryCatalog: {
        return inventoryCatalogPageIsBusy;
      }
      default: {
        return false;
      }
    }
  },
);
