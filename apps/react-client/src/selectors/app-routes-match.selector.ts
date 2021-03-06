import { createMatchSelector } from 'connected-react-router';
import { RootState } from '..';
import {
  RegisterEmployeeRouteParams,
  AppRouePaths,
} from '../components/AppRoutes';

const selectRegisterEmployeeRouteMatch = createMatchSelector<
  RootState,
  RegisterEmployeeRouteParams
>(AppRouePaths.registerEmployee);
const selectLoginRouteMatch = createMatchSelector(AppRouePaths.login);
const selectDashboardRouteMatch = createMatchSelector(AppRouePaths.dashboard);
const selectInventoryCatalogRouteMatch = createMatchSelector(
  AppRouePaths.inventoryCatalog,
);
const selectInventoryBalanceRouteMatch = createMatchSelector(
  AppRouePaths.inventoryBalance,
);
const selectEmployeeInvitationRouteMatch = createMatchSelector(
  AppRouePaths.employeeInvitation,
);
const selectEmployeeManagementRouteMatch = createMatchSelector(
  AppRouePaths.employeeManagement,
);

export const appRoutesMatchSelectors = {
  selectRegisterEmployeeRouteMatch,
  selectLoginRouteMatch,
  selectDashboardRouteMatch,
  selectInventoryCatalogRouteMatch,
  selectInventoryBalanceRouteMatch,
  selectEmployeeInvitationRouteMatch,
  selectEmployeeManagementRouteMatch,
};
