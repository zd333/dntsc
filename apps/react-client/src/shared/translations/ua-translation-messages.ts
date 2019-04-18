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

  'appAccessRole._CLINIC_OWNER': 'Володар клініки',
  'appAccessRole._HR': 'Менеджер персоналу',
  'appAccessRole._INVENTORY_MASTER': 'Менеджер складу',
  'appAccessRole._INVENTORY_BALANCE_KEEPER': 'Оператор складу',

  'mainMenu.InventoryMenuItem.text': 'Склад',
  'mainMenu.InventoryCatalogMenuItem.text': 'Каталог',

  'mainMenu.EmployeesMenuItem.text': 'Персонал',
  'mainMenu.EmployeesInvitationMenuItem.text': 'Запрошення',
  'mainMenu.EmployeesManagementMenuItem.text': 'Керування',

  'loginPage.title': 'Вхід',
  'loginPage.loginForm.title': 'Вхід',
  'loginPage.loginForm.loginInput.label': 'Логін',
  'loginPage.loginForm.passwordInput.label': 'Пароль',
  'loginPage.loginForm.submitButton.text': 'Увійти',
  'loginPage.loginForm.loginInput.validationErrorMessages.empty': `обов'язкове`,
  'loginPage.loginForm.loginInput.validationErrorMessages.short':
    'надто короткий',
  'loginPage.loginForm.passwordInput.validationErrorMessages.empty': `обов'язкове`,

  'dashboardPage.title': 'Головне меню',

  'inventoryCatalogPage.title': 'Каталог складу',

  'inventoryCatalogPage.inventoryItemsList.AddNewItemButton.label':
    'Додати новий',
  'inventoryCatalogPage.inventoryItemsList.searchItemsControl.label': 'Пошук',
  'inventoryCatalogPage.inventoryItemsList.filterByTagsControl.label':
    'Відфільтрувати за тегами',

  'inventoryCatalogPage.addNewInventoryItemDialog.title':
    'Додати нову позицію складу',

  'inventoryCatalogPage.inventoryItemDetailsForm.nameControl.label': 'Назва',
  'inventoryCatalogPage.inventoryItemDetailsForm.unitsControl.label':
    'Одиниці виміру',
  'inventoryCatalogPage.inventoryItemDetailsForm.tagsControl.label': 'Теги',
  'inventoryCatalogPage.inventoryItemDetailsForm.alternatesControl.label':
    'Аналоги',

  'employeeInvitationPage.title': 'Запрошення працівників',
  'employeeInvitationPage.invitationForm.rolesSelect.label':
    'Оберіть ролі для нового працівника',
  'employeeInvitationPage.invitationForm.submitButton.text':
    'Сгенерувати запрошення',
  'employeeInvitationPage.invitationLink.text':
    'Скопіюйте це посилання та надайте його новому працівнику для завершення його реєстрації',

  'employeeManagementPage.title': 'Керування персоналом',

  'errorModal.title': 'Помилка',
  'errorModal.defaultErrorMessage': 'Вибачте, виникла несподівана помилка.',
};
