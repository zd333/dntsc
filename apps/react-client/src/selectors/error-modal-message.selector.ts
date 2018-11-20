import { createSelector } from 'reselect';
import { selectErrorModalState } from './error-modal-state.selector';

export const selectErrorModalMessage = createSelector(
  [selectErrorModalState],
  errorModalState => errorModalState && errorModalState.errorMessage,
);
