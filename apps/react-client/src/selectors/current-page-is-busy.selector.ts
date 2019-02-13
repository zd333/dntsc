import { createSelector } from 'reselect';
import { selectDashboardPageIsBusy } from '../sub-features/dashboard/selectors/dashboard-page-is-busy.selector';
import { selectLoginPageIsBusy } from './login-page-is-busy.selector';
import { selectRoutePath } from './route-path.selector';

export const selectCurrentPageIsBusy = createSelector(
  [selectRoutePath, selectLoginPageIsBusy, selectDashboardPageIsBusy],
  (routePath, loginPageIsBusy, dashboardPageIsBusy) => {
    switch (routePath) {
      case '/login': {
        return loginPageIsBusy;
      }
      case '/dashboard': {
        return dashboardPageIsBusy;
      }
      default: {
        return false;
      }
    }
  },
);
