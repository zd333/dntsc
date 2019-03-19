import { AppTranslationMessages } from './en-translation-messages';

export const ruTranslationMessages: AppTranslationMessages = {
  defaultPageTitle: 'Управление клиникой',

  'common.validationErrorMessage.requiredField':
    '{fieldName} обязательное поле',
  'common.validationErrorMessage.stringMin':
    '{fieldName} короче $\\{min\\} букв',

  'common.cancelButtonLabel': 'Отмена',
  'common.saveButtonLabel': 'Сохранить',

  'inventoryItemUnit.PCS.short': 'шт',
  'inventoryItemUnit.KG.short': 'кг',
  'inventoryItemUnit.GR.short': 'гр',
  'inventoryItemUnit.MG.short': 'мг',
  'inventoryItemUnit.LT.short': 'л',
  'inventoryItemUnit.ML.short': 'мл',
  'inventoryItemUnit.PCS.full': 'штук',
  'inventoryItemUnit.KG.full': 'килограмм',
  'inventoryItemUnit.GR.full': 'грамм',
  'inventoryItemUnit.MG.full': 'миллиграмм',
  'inventoryItemUnit.LT.full': 'литр',
  'inventoryItemUnit.ML.full': 'миллилитр',

  'mainMenu.InventoryMenuItem.text': 'Склад',
  'mainMenu.InventoryCatalogMenuItem.text': 'Каталог',

  'loginPage.title': 'Вход',
  'loginPage.loginForm.title': 'Вход',
  'loginPage.loginForm.emailInput.label': 'Email',
  'loginPage.loginForm.passwordInput.label': 'Пароль',
  'loginPage.loginForm.submitButton.text': 'Войти',
  'loginPage.loginForm.emailInput.validationErrorMessages.empty':
    'обязательное',
  'loginPage.loginForm.emailInput.validationErrorMessages.invalid': 'не email',
  'loginPage.loginForm.passwordInput.validationErrorMessages.empty':
    'обязательное',

  'dashboardPage.title': 'Главное меню',

  'inventoryCatalogPage.title': 'Каталог склада',

  'inventoryCatalogPage.inventoryItemsList.AddNewItemButton.label':
    'Добавить новый',
  'inventoryCatalogPage.inventoryItemsList.searchItemsControl.label': 'Поиск',

  'inventoryCatalogPage.addNewInventoryItemDialog.title':
    'Добавить новую позицию склада',

  'inventoryCatalogPage.inventoryItemDetailsForm.nameControl.label': 'Название',
  'inventoryCatalogPage.inventoryItemDetailsForm.unitsControl.label':
    'Единицы измерения',
  'inventoryCatalogPage.inventoryItemDetailsForm.tagsControl.label': 'Теги',
  'inventoryCatalogPage.inventoryItemDetailsForm.alternatesControl.label':
    'Аналоги',

  'errorModal.title': 'Ошибка',
  'errorModal.defaultErrorMessage': 'Извините, возникла ошибка.',
};
