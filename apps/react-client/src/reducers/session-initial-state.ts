import { AppLanguages, SessionState } from './session-state.interface';

export const sessionInitialState: SessionState = {
  authToken: undefined,
  userRoles: [],
  userName: undefined,
  authApiCommunicationIsInProgress: false,
  // English is default, make sure to update `selectCurrentTranslationsDictionary` if you change this
  currentLanguage: AppLanguages.en,
  availableFeatures: [],
};
