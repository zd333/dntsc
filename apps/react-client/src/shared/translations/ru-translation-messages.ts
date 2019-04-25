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

  'appAccessRole._CLINIC_OWNER': 'Владелец клиники',
  'appAccessRole._HR': 'Менеджер персонала',
  'appAccessRole._INVENTORY_MASTER': 'Менеджер склада',
  'appAccessRole._INVENTORY_BALANCE_KEEPER': 'Оператор склада',

  'mainMenu.InventoryMenuItem.text': 'Склад',
  'mainMenu.InventoryCatalogMenuItem.text': 'Каталог',
  'mainMenu.InventoryBalanceMenuItem.text': 'Баланс',
  'mainMenu.EmployeesMenuItem.text': 'Персонал',
  'mainMenu.EmployeesInvitationMenuItem.text': 'Приглашение',
  'mainMenu.EmployeesManagementMenuItem.text': 'Управление',

  'employeeRegistrationPage.title': 'Регистрация сотрудника',
  'employeeRegistrationPage.alreadyRegisteredMessage': `
    Вы зарегистрировались, теперь обратитесь к ответсвенному лицу для активации Вашего аккаунта.
  `,
  'employeeRegistrationPage.tokenCanBeExpiredMessage': `
    Если Вы не регистрировались, но все же видите это сообщение - то возможно,
    что Ваше приглашение устарело (ссылка имеет ограниченный срок действия).
    В таком случае ответсвенное лицо должно создать для Вас новое приглашение.
  `,
  'employeeRegistrationPage.toMainLink.text': 'На главную',
  'employeeRegistrationPage.employeeRegistrationForm.title':
    'Регистрация сотрудника',
  'employeeRegistrationPage.employeeRegistrationForm.nameControl.label': 'Имя',
  'employeeRegistrationPage.employeeRegistrationForm.loginControl.label':
    'Логин',
  'employeeRegistrationPage.employeeRegistrationForm.passwordControl.label':
    'Пароль',
  'employeeRegistrationPage.employeeRegistrationForm.submitButton.text':
    'Зарегистрироваться',

  'loginPage.title': 'Вход',
  'loginPage.loginForm.title': 'Вход',
  'loginPage.loginForm.loginInput.label': 'Логин',
  'loginPage.loginForm.passwordInput.label': 'Пароль',
  'loginPage.loginForm.submitButton.text': 'Войти',
  'loginPage.loginForm.loginInput.validationErrorMessages.empty':
    'обязательное',
  'loginPage.loginForm.loginInput.validationErrorMessages.short':
    'слишком короткий',
  'loginPage.loginForm.passwordInput.validationErrorMessages.empty':
    'обязательное',

  'dashboardPage.title': 'Главное меню',

  'inventoryCatalogPage.title': 'Каталог склада',

  'inventoryCatalogPage.inventoryItemsList.AddNewItemButton.label':
    'Добавить новый',
  'inventoryCatalogPage.inventoryItemsList.searchItemsControl.label': 'Поиск',
  'inventoryCatalogPage.inventoryItemsList.filterByTagsControl.label':
    'Отфильтровать по меткам',
  'inventoryCatalogPage.addNewInventoryItemDialog.title':
    'Добавить новую позицию склада',
  'inventoryCatalogPage.inventoryItemDetailsForm.nameControl.label': 'Название',
  'inventoryCatalogPage.inventoryItemDetailsForm.unitsControl.label':
    'Единицы измерения',
  'inventoryCatalogPage.inventoryItemDetailsForm.tagsControl.label': 'Метки',
  'inventoryCatalogPage.inventoryItemDetailsForm.alternatesControl.label':
    'Аналоги',

  'inventoryBalancePage.title': 'Складской баланс',

  'employeeInvitationPage.title': 'Приглашение сотрудников',
  'employeeInvitationPage.invitationForm.rolesSelect.label':
    'Выберите роли для нового сотрудника',
  'employeeInvitationPage.invitationForm.submitButton.text':
    'Сгенерировать приглашение',
  'employeeInvitationPage.invitationLink.text':
    'Скопируйте эту ссылку и предоставьте ее новому сотруднику для завершения его регистрации',

  'employeeManagementPage.title': 'Управление персоналом',
  'employeeManagementPage.employeeList.item.noRolesMessage': 'Права отсутсвуют',
  'employeeManagementPage.employeeDetailsForm.nameControl.label': 'Имя',
  'employeeManagementPage.employeeDetailsForm.rolesControl.label': 'Права',

  'employeeManagementPage.editEmployeeDialog.title':
    'Редактирование сотрудника',

  'errorModal.title': 'Ошибка',
  'errorModal.defaultErrorMessage': 'Извините, возникла ошибка.',
};
