import { AppRouePaths } from '../components/app-routes';
import { createSelector } from 'reselect';
import { selectEmployeeInvitationPageIsBusy } from '../sub-features/employees/selectors/employee-invitation-page-is-busy.selector';
import { selectEmployeeManagementPageIsBusy } from '../sub-features/employees/selectors/employee-management-page-is-busy.selector';
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
    selectInventoryCatalogPageIsBusy,
    selectEmployeeInvitationPageIsBusy,
    selectEmployeeManagementPageIsBusy,
  ],
  (
    routePath,
    loginPageIsBusy,
    inventoryCatalogPageIsBusy,
    employeeInvitationPageIsBusy,
    employeeManagementPageIsBusy,
  ) => {
    switch (routePath) {
      case AppRouePaths.login: {
        return loginPageIsBusy;
      }
      case AppRouePaths.inventoryCatalog: {
        return inventoryCatalogPageIsBusy;
      }
      case AppRouePaths.employeeInvitation: {
        return employeeInvitationPageIsBusy;
      }
      case AppRouePaths.employeeManagement: {
        return employeeManagementPageIsBusy;
      }
      default: {
        return false;
      }
    }
  },
);
