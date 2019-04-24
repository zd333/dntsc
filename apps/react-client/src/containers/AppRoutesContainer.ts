import { AppRoutes, AppRoutesProps } from '../components/AppRoutes';
import { connect } from 'react-redux';
import { RootState } from '../../src';
import { selectIsEmployeesManagementAllowedToCurrentUser } from '../selectors/is-employees-management-allowed-to-current-user.selector';
import { selectIsInventoryFeatureEnabled } from '../selectors/is-inventory-feature-enabled.selector';
import { selectUserIsLoggedIn } from '../selectors/user-is-logged-in.selector';
import { StateToComponentNonFunctionPropsMapper } from '../../src/shared/types/container-state-mapper.interface';

const mapStateToProps: StateToComponentNonFunctionPropsMapper<
  AppRoutesProps,
  RootState
> = state => {
  return {
    isUserLoggedIn: selectUserIsLoggedIn(state),
    isInventoryEnabled: selectIsInventoryFeatureEnabled(state),
    isEmployeesEnabled: selectIsEmployeesManagementAllowedToCurrentUser(state),
  };
};

export const AppRoutesContainer = connect(mapStateToProps)(AppRoutes);
