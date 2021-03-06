import { AppRouePaths } from '../components/AppRoutes';
import { AppTranslationMessages } from '../shared/translations/en-translation-messages';
import { createSelector } from 'reselect';
import { selectCurrentTranslationsDictionary } from './current-translations-dictionary.selector';
import { selectRoutePath } from './route-path.selector';

/**
 * This should be used in shell app bar and as window title.
 * TODO: bind to WEB page title.
 */
export const selectCurrentPageName = createSelector(
  [selectRoutePath, selectCurrentTranslationsDictionary],
  (routePath, currentTranslationsDictionary) => {
    const translationsDictionaryKey: keyof AppTranslationMessages =
      routePath === AppRouePaths.login
        ? 'loginPage.title'
        : routePath === AppRouePaths.dashboard
        ? 'dashboardPage.title'
        : routePath === AppRouePaths.inventoryCatalog
        ? 'inventoryCatalogPage.title'
        : routePath === AppRouePaths.inventoryBalance
        ? 'inventoryBalancePage.title'
        : routePath === AppRouePaths.employeeInvitation
        ? 'employeeInvitationPage.title'
        : routePath === AppRouePaths.employeeManagement
        ? 'employeeManagementPage.title'
        : 'defaultPageTitle';

    return currentTranslationsDictionary[translationsDictionaryKey];
  },
);
