import { connect } from 'react-redux';
import { Header, HeaderProps } from '../components/Header';
import { RootState } from '..';
import { selectCurrentPageName } from '../selectors/current-page-name.selector';
import { selectCurrentUserName } from '../selectors/current-user-name.selector';
import { SessionActions } from '../actions/session.actions';
import {
  DispatchMapper,
  StateMapper,
} from '../shared/interfaces/container-state-mapper.interface';

// TODO: replace this with ShellContainer

const mapStateToProps: StateMapper<HeaderProps, RootState> = state => {
  return {
    title: `${selectCurrentPageName(state)} (${selectCurrentUserName(state)})`,
  };
};

const mapDispatchToProps: DispatchMapper<HeaderProps> = dispatch => {
  return {
    onLogout: () => {
      dispatch(SessionActions.logout());
    },
  };
};

export const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
