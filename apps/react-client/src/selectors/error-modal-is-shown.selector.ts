import { createSelector } from 'reselect';
import { selectErrorModalState } from './error-modal-state.selector';

export const selectErrorModalIsShown = createSelector(
  [selectErrorModalState],
  errorModalState => !!errorModalState && errorModalState.errorModalIsShown,
);
