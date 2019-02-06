import { AppLanguages } from '../reducers/session-state.interface';
import { createSelector } from 'reselect';
import { ruTranslationMessages } from '../shared/translations/ru-translation-messages';
import { selectCurrentLanguage } from './current-language.selector';
import { uaTranslationMessages } from '../shared/translations/ua-translation-messages';
import {
  enTranslationMessages,
  AppTranslationMessages,
} from '../shared/translations/en-translation-messages';

/**
 * This technical intermediate selector to be used in other selectors.
 * Selects `AppTranslationMessages` that corresponds current language.
 */
export const selectCurrentTranslationsDictionary = createSelector(
  [selectCurrentLanguage],
  currentLanguage => {
    const dictionary: AppTranslationMessages =
      currentLanguage === AppLanguages.ua
        ? uaTranslationMessages
        : currentLanguage === AppLanguages.ru
        ? ruTranslationMessages
        : // English is default, make sure to update `sessionInitialState` if you change this
          enTranslationMessages;

    return dictionary;
  },
);
