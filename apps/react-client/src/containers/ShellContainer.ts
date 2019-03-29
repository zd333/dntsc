import { connect } from 'react-redux';
import { RootState } from '..';
import { selectCurrentLanguage } from '../selectors/current-language.selector';
import { selectCurrentPageIsBusy } from '../selectors/current-page-is-busy.selector';
import { selectCurrentPageName } from '../selectors/current-page-name.selector';
import { selectCurrentUserName } from '../selectors/current-user-name.selector';
import { selectIsInventoryFeatureEnabled } from '../selectors/is-inventory-feature-enabled.selector';
import { selectRoutePath } from '../selectors/route-path.selector';
import { SessionActions } from '../actions/session.actions';
import { Shell, ShellProps } from '../components/Shell';
import {
  DispatchMapper,
  StateMapper,
} from '../shared/types/container-state-mapper.interface';

const mapStateToProps: StateMapper<ShellProps, RootState> = state => {
  return {
    title: `${selectCurrentPageName(state)} (${selectCurrentUserName(state)})`,
    currentLanguage: selectCurrentLanguage(state),
    isInventoryEnabled: selectIsInventoryFeatureEnabled(state),
    routePath: selectRoutePath(state),
    isBusy: selectCurrentPageIsBusy(state),
  };
};

const mapDispatchToProps: DispatchMapper<ShellProps> = dispatch => {
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
