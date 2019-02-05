import { AppTranslationMessages } from '../shared/translations/en-translation-messages';
import { createSelector } from 'reselect';
import { selectCurrentTranslationsDictionary } from './current-translations-dictionary.selector';
import { selectRoutePath } from './route-path.selector';

/**
 * This should be used in shell app bar and as window title.
 * TODO: bind to page title.
 */
export const selectCurrentPageName = createSelector(
  [selectRoutePath, selectCurrentTranslationsDictionary],
  (routePath, currentTranslationsDictionary) => {
    const translationsDictionaryKey: keyof AppTranslationMessages =
      routePath === '/login'
        ? 'loginPage.title'
        : routePath === '/dashboard'
        ? 'dashboardPage.title'
        : routePath === '/patients'
        ? 'patientsManagementPage.title'
        : 'defaultPageTitle';

    return currentTranslationsDictionary[translationsDictionaryKey];
  },
);
