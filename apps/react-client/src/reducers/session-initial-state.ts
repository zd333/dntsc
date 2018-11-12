import { SessionState } from './session-state.interface';

export const sessionInitialState: SessionState = {
  isLoggedIn: false,
  authApiCommunicationIsInProgress: false,
  currentLanguage: 'en',
};
