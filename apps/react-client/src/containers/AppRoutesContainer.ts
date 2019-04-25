import { AppRoutes, AppRoutesProps } from '../components/AppRoutes';
import { connect } from 'react-redux';
import { RootState } from '../../src';
import { selectAreInventoryPagesAvailableForCurrentUser } from '../selectors/are-inventory-pages-awailable-to-current-user.selector';
import { selectIsEmployeesManagementAllowedToCurrentUser } from '../selectors/is-employees-management-allowed-to-current-user.selector';
import { selectUserIsLoggedIn } from '../selectors/user-is-logged-in.selector';
import { StateToComponentNonFunctionPropsMapper } from '../../src/shared/types/container-state-mapper.interface';

const mapStateToProps: StateToComponentNonFunctionPropsMapper<
  AppRoutesProps,
  RootState
> = state => {
  return {
    isUserLoggedIn: selectUserIsLoggedIn(state),
    areInventoryPagesEnabled: selectAreInventoryPagesAvailableForCurrentUser(
      state,
    ),
    isEmployeeManagementPageEnabled: selectIsEmployeesManagementAllowedToCurrentUser(
      state,
    ),
  };
};

export const AppRoutesContainer = connect(mapStateToProps)(AppRoutes);
