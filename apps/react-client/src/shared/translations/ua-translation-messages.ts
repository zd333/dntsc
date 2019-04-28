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
  'mainMenu.InventoryBalanceMenuItem.text': 'Баланс',
  'mainMenu.EmployeesMenuItem.text': 'Персонал',
  'mainMenu.EmployeesInvitationMenuItem.text': 'Запрошення',
  'mainMenu.EmployeesManagementMenuItem.text': 'Керування',

  'employeeRegistrationPage.title': 'Реєстрація працівника',
  'employeeRegistrationPage.alreadyRegisteredMessage': `
    Ви зареєструвалися, тепер зверніться до відповідальної особи для активації Вашого акаунта.
  `,
  'employeeRegistrationPage.tokenCanBeExpiredMessage': `
    Якщо Ви не реєструвалися, але все ж бачите це повідомлення - то можливо
    що Ваше запрошення застаріло (посилання має обмежений термін дії).
    У такому випадку відповідальна особа повинна створити для Вас нове запрошення.
  `,
  'employeeRegistrationPage.toMainLink.text': 'На головну',
  'employeeRegistrationPage.employeeRegistrationForm.title':
    'Реєстрація працівника',
  'employeeRegistrationPage.employeeRegistrationForm.nameControl.label': `Ім'я`,
  'employeeRegistrationPage.employeeRegistrationForm.loginControl.label':
    'Логін',
  'employeeRegistrationPage.employeeRegistrationForm.passwordControl.label':
    'Пароль',
  'employeeRegistrationPage.employeeRegistrationForm.submitButton.text':
    'Зареєструватися',

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
    'Відфільтрувати по мітках',
  'inventoryCatalogPage.addNewInventoryItemDialog.title':
    'Додати нову позицію складу',
  'inventoryCatalogPage.inventoryItemDetailsForm.nameControl.label': 'Назва',
  'inventoryCatalogPage.inventoryItemDetailsForm.unitsControl.label':
    'Одиниці виміру',
  'inventoryCatalogPage.inventoryItemDetailsForm.tagsControl.label': 'Мітки',
  'inventoryCatalogPage.inventoryItemDetailsForm.alternatesControl.label':
    'Аналоги',

  'inventoryBalancePage.title': 'Складський баланс',
  'inventoryBalancePage.inventoryItemsBalancesList.searchItemsControl.label':
    'Пошук',
  'inventoryBalancePage.inventoryItemsBalancesList..filterByTagsControl.label':
    'Відфільтрувати по мітках',
  'inventoryBalancePage.addNewInventoryBalanceChangeDialog.addPositiveMode.title':
    'Надходження на склад',
  'inventoryBalancePage.addNewInventoryBalanceChangeDialog.addNegativeMode.title':
    'Списання зі складу',
  'inventoryBalancePage.addNewInventoryBalanceChangeDialog.amountControl.label':
    'Кількість',
  'inventoryBalancePage.addNewInventoryBalanceChangeDialog.commentControl.label':
    'Коментар',
  'inventoryBalancePage.addNewInventoryBalanceChangeDialog.submitButton.addPositiveMode.label':
    'Додати',
  'inventoryBalancePage.addNewInventoryBalanceChangeDialog.submitButton.addNegativeMode.label':
    'Списати',

  'employeeInvitationPage.title': 'Запрошення працівників',
  'employeeInvitationPage.invitationForm.rolesSelect.label':
    'Оберіть ролі для нового працівника',
  'employeeInvitationPage.invitationForm.submitButton.text':
    'Сгенерувати запрошення',
  'employeeInvitationPage.invitationLink.text':
    'Скопіюйте це посилання та надайте його новому працівнику для завершення його реєстрації',

  'employeeManagementPage.title': 'Керування персоналом',
  'employeeManagementPage.employeeList.item.noRolesMessage': 'Права відсутні',
  'employeeManagementPage.employeeDetailsForm.nameControl.label': `Ім'я`,
  'employeeManagementPage.employeeDetailsForm.rolesControl.label': 'Права',

  'employeeManagementPage.editEmployeeDialog.title': 'Редагування працівника',

  'errorModal.title': 'Помилка',
  'errorModal.defaultErrorMessage': 'Вибачте, виникла несподівана помилка.',
};
