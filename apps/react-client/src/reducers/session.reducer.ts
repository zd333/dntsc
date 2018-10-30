export interface SessionState {
  readonly isLoggedIn: boolean;
}

export const sessionInitialState: SessionState = { isLoggedIn: false };

// TODO: typings
export function sessionReducer(
  state: SessionState = sessionInitialState,
  action: any,
): SessionState {
  switch (action.type) {
    default:
      return state;
  }
}
