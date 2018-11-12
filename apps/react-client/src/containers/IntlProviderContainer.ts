import * as en from 'react-intl/locale-data/en';
import * as ru from 'react-intl/locale-data/ru';
import { addLocaleData, IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { RootState } from 'src';
import { selectCurrentLanguage } from 'src/selectors/current-language.selector';
import { StateMapper } from 'src/shared/container-state-mapper.interface';

const enTranspationMessages = {};
const ruTranspationMessages = {};

// TODO: add ukrainian language
addLocaleData([...en, ...ru]);

const mapStateToProps: StateMapper<IntlProvider.Props, RootState> = state => {
  const currentLanguage = selectCurrentLanguage(state);

  switch (currentLanguage) {
    case 'ru': {
      return { locale: currentLanguage, messages: ruTranspationMessages };
    }
    case 'en':
    default: {
      // EN is fallback language
      return { locale: 'en', messages: enTranspationMessages };
    }
  }
};

export const IntlProviderContainer = connect(mapStateToProps)(IntlProvider);
