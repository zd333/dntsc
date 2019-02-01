export interface SessionState {
  readonly authToken: string | undefined;
  readonly authApiCommunicationIsInProgress: boolean;
  readonly currentLanguage: 'en' | 'ru' | 'ua';
}
