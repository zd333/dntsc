import { SessionState } from './session-state.interface';

export const sessionInitialState: SessionState = {
  authToken: undefined,
  authApiCommunicationIsInProgress: false,
  currentLanguage: 'en',
};
