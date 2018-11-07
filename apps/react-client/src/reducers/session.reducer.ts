import { AllSessionActions } from 'src/actions/session.actions';
import { sessionInitialState } from './session-initial-state';
import { SessionState } from './session-state.interface';

export function sessionReducer(
  state: SessionState = sessionInitialState,
  action: AllSessionActions,
): SessionState {
  switch (action.type) {
    default:
      return state;
  }
}
