import { connect } from 'react-redux';
import { RootState } from '..';
import { selectAreInventoryPagesAvailableForCurrentUser } from '../selectors/are-inventory-pages-awailable-to-current-user.selector';
import { selectCurrentLanguage } from '../selectors/current-language.selector';
import { selectCurrentPageIsBusy } from '../selectors/current-page-is-busy.selector';
import { selectCurrentPageName } from '../selectors/current-page-name.selector';
import { selectCurrentUserName } from '../selectors/current-user-name.selector';
import { selectIsEmployeesManagementAllowedToCurrentUser } from '../selectors/is-employees-management-allowed-to-current-user.selector';
import { selectRoutePath } from '../selectors/route-path.selector';
import { SessionActions } from '../actions/session.actions';
import { Shell, ShellProps } from '../components/Shell';
import {
  DispatchToComponentFunctionPropsMapper,
  StateToComponentNonFunctionPropsMapper,
} from '../shared/types/container-state-mapper.interface';

const mapStateToProps: StateToComponentNonFunctionPropsMapper<
  ShellProps,
  RootState
> = state => {
  return {
    title: `${selectCurrentPageName(state)} (${selectCurrentUserName(state)})`,
    currentLanguage: selectCurrentLanguage(state),
    areInventoryPagesEnabled: selectAreInventoryPagesAvailableForCurrentUser(
      state,
    ),
    isEmployeeManagementPageEnabled: selectIsEmployeesManagementAllowedToCurrentUser(
      state,
    ),
    routePath: selectRoutePath(state),
    isBusy: selectCurrentPageIsBusy(state),
  };
};

const mapDispatchToProps: DispatchToComponentFunctionPropsMapper<
  ShellProps
> = dispatch => {
  return {
    onLanguageChange: params => {
      dispatch(SessionActions.changeLanguage({ language: params.language }));
    },
    onLogout: () => {
      dispatch(SessionActions.logout());
    },
  };
};

export const ShellContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shell);
