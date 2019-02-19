import { AppRouePaths } from '../components/app-routes';
import { createSelector } from 'reselect';
import { selectDashboardPageIsBusy } from '../sub-features/dashboard/selectors/dashboard-page-is-busy.selector';
import { selectInventoryCatalogPageIsBusy } from '../sub-features/inventory/selectors/inventory-catalog-page-is-busy.selector';
import { selectLoginPageIsBusy } from './login-page-is-busy.selector';
import { selectRoutePath } from './route-path.selector';

/**
 * Make sure you add case here for every new app page.
 */
export const selectCurrentPageIsBusy = createSelector(
  [
    selectRoutePath,
    selectLoginPageIsBusy,
    selectDashboardPageIsBusy,
    selectInventoryCatalogPageIsBusy,
  ],
  (
    routePath,
    loginPageIsBusy,
    dashboardPageIsBusy,
    inventoryCatalogPageIsBusy,
  ) => {
    switch (routePath) {
      case AppRouePaths.login: {
        return loginPageIsBusy;
      }
      case AppRouePaths.dashboard: {
        return dashboardPageIsBusy;
      }
      case AppRouePaths.inventoryCatalog: {
        return inventoryCatalogPageIsBusy;
      }
      // TODO: add inventoryCatalog page case
      default: {
        return false;
      }
    }
  },
);
