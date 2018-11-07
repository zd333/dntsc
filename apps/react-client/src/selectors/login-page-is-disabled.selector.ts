import { createSelector } from 'reselect';
import { selectRootState } from './root-state.selector';
import { selectUserIsLoggedIn } from './user-is-logged-in.selector';

export const selectLoginPageIsDisabled = createSelector(
  [selectUserIsLoggedIn, selectRootState],
  (userIsLoggedIn, rootState) =>
    userIsLoggedIn ||
    !rootState ||
    !rootState.session ||
    rootState.session.authApiCommunicationIsInProgress,
);
