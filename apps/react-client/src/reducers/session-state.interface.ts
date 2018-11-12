export interface SessionState {
  // TODO: can this be calculated? if so then refactor after it is possible
  readonly isLoggedIn: boolean;
  readonly authApiCommunicationIsInProgress: boolean;
  readonly currentLanguage: 'en' | 'ru';
}
