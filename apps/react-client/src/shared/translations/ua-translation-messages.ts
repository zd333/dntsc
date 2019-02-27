import { AppTranslationMessages } from './en-translation-messages';

export const uaTranslationMessages: AppTranslationMessages = {
  defaultPageTitle: 'Керування клінікою',

  'common.validationErrorMessage.requiredField': `{fieldName} обов'язкове поле`,
  'common.validationErrorMessage.stringMin':
    '{fieldName} коротше $\\{min\\} букв',

  'common.cancelButtonLabel': 'Скасувати',
  'common.saveButtonLabel': 'Зберігти',

  'inventoryItemUnit.PCS.short': 'шт',
  'inventoryItemUnit.KG.short': 'кг',
  'inventoryItemUnit.GR.short': 'гр',
  'inventoryItemUnit.MG.short': 'мг',
  'inventoryItemUnit.LT.short': 'л',
  'inventoryItemUnit.ML.short': 'мл',
  'inventoryItemUnit.PCS.full': 'штук',
  'inventoryItemUnit.KG.full': 'кілограм',
  'inventoryItemUnit.GR.full': 'грам',
  'inventoryItemUnit.MG.full': 'міліграм',
  'inventoryItemUnit.LT.full': 'літр',
  'inventoryItemUnit.ML.full': 'мілілітр',

  'mainMenu.InventoryMenuItem.text': 'Склад',
  'mainMenu.InventoryCatalogMenuItem.text': 'Каталог',

  'loginPage.title': 'Вхід',
  'loginPage.loginForm.title': 'Вхід',
  'loginPage.loginForm.emailInput.label': 'Email',
  'loginPage.loginForm.passwordInput.label': 'Пароль',
  'loginPage.loginForm.submitButton.text': 'Увійти',
  'loginPage.loginForm.emailInput.validationErrorMessages.empty': `обов'язкове`,
  'loginPage.loginForm.emailInput.validationErrorMessages.invalid': 'не email',
  'loginPage.loginForm.passwordInput.validationErrorMessages.empty': `обов'язкове`,

  'dashboardPage.title': 'Головне меню',

  'inventoryCatalogPage.title': 'Каталог складу',

  'inventoryCatalogPage.inventoryItemsList.AddNewItemButton.label':
    'Додати новий',
  'inventoryCatalogPage.inventoryItemsList.searchItemsControl.label': 'Пошук',

  'inventoryCatalogPage.addNewInventoryItemDialog.title':
    'Додати нову позицію складу',

  'inventoryCatalogPage.inventoryItemDetailsForm.nameControl.label': 'Назва',
  'inventoryCatalogPage.inventoryItemDetailsForm.unitsControl.label':
    'Одиниці виміру',

  'errorModal.title': 'Помилка',
  'errorModal.defaultErrorMessage': 'Вибачте, виникла несподівана помилка.',
};
