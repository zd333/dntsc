import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';
import { addLocaleData, IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { enTranslationMessages } from '../../src/shared/translations/en-translation-messages';
import { RootState } from '../../src';
import { ruTranslationMessages } from '../../src/shared/translations/ru-translation-messages';
import { selectCurrentLanguage } from '../../src/selectors/current-language.selector';
import { StateMapper } from '../../src/shared/interfaces/container-state-mapper.interface';
import { uaTranslationMessages } from '../../src/shared/translations/ua-translation-messages';

addLocaleData([...en, ...ru]);

const mapStateToProps: StateMapper<IntlProvider.Props, RootState> = state => {
  const currentLanguage = selectCurrentLanguage(state);

  switch (currentLanguage) {
    case 'ru': {
      return { locale: currentLanguage, messages: ruTranslationMessages };
    }
    // For now use ru locale data for ua because ua is missing in react-intl
    // TODO: investigate and resolve if needed ^^^
    case 'ua': {
      return { locale: 'ru', messages: uaTranslationMessages };
    }
    case 'en':
    default: {
      // EN is fallback language
      return { locale: 'en', messages: enTranslationMessages };
    }
  }
};

export const IntlProviderContainer = connect(mapStateToProps)(IntlProvider);
