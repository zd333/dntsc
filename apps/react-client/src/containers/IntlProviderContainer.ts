import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';
import { addLocaleData, IntlProvider } from 'react-intl';
import { AppLanguages } from '../reducers/session-state.interface';
import { connect } from 'react-redux';
import { enTranslationMessages } from '../shared/translations/en-translation-messages';
import { RootState } from '../../src';
import { ruTranslationMessages } from '../shared/translations/ru-translation-messages';
import { selectCurrentLanguage } from '../selectors/current-language.selector';
import { StateToComponentNonFunctionPropsMapper } from '../shared/types/container-state-mapper.interface';
import { uaTranslationMessages } from '../shared/translations/ua-translation-messages';

addLocaleData([...en, ...ru]);

const mapStateToProps: StateToComponentNonFunctionPropsMapper<
  IntlProvider.Props,
  RootState
> = state => {
  const currentLanguage = selectCurrentLanguage(state);

  switch (currentLanguage) {
    case AppLanguages.ru: {
      return { locale: AppLanguages.ru, messages: ruTranslationMessages };
    }
    // For now use ru locale data for ua because ua is missing in react-intl
    case AppLanguages.ua: {
      return { locale: AppLanguages.ru, messages: uaTranslationMessages };
    }
    case AppLanguages.en:
    default: {
      // EN is fallback language
      return { locale: AppLanguages.en, messages: enTranslationMessages };
    }
  }
};

export const IntlProviderContainer = connect(mapStateToProps)(IntlProvider);
