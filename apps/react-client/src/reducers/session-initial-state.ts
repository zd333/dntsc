import { AppLanguages, SessionState } from './session-state.interface';

export const sessionInitialState: SessionState = {
  userIsLoggedIn: undefined,
  authToken: undefined,
  refreshToken: undefined,
  userRoles: [],
  userName: undefined,
  authApiCommunicationIsInProgress: false,
  // English is default, make sure to update `selectCurrentTranslationsDictionary` if you change this
  currentLanguage: AppLanguages.en,
  availableFeatures: undefined,
};
