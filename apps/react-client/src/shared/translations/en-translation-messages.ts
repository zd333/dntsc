export const enTranslationMessages = {
  defaultPageTitle: 'Clinic Management',

  'common.validationErrorMessage.requiredField':
    '{fieldName} is required field',
  'common.validationErrorMessage.stringMin':
    '{fieldName} must be at least $\\{min\\} characters',

  'common.cancelButtonLabel': 'Cancel',
  'common.saveButtonLabel': 'Save',

  'inventoryItemUnit.PCS.short': 'pcs',
  'inventoryItemUnit.KG.short': 'kg',
  'inventoryItemUnit.GR.short': 'gr',
  'inventoryItemUnit.MG.short': 'mg',
  'inventoryItemUnit.LT.short': 'l',
  'inventoryItemUnit.ML.short': 'ml',
  'inventoryItemUnit.PCS.full': 'pieces',
  'inventoryItemUnit.KG.full': 'kilo',
  'inventoryItemUnit.GR.full': 'gram',
  'inventoryItemUnit.MG.full': 'milligram',
  'inventoryItemUnit.LT.full': 'liter',
  'inventoryItemUnit.ML.full': 'milliliter',

  'appAccessRole._CLINIC_OWNER': 'Clinic Owner',
  'appAccessRole._HR': 'HR',
  'appAccessRole._INVENTORY_MASTER': 'Inventory Master',
  'appAccessRole._INVENTORY_BALANCE_KEEPER': 'Inventory Balance Operator',

  'mainMenu.InventoryMenuItem.text': 'Inventory',
  'mainMenu.InventoryCatalogMenuItem.text': 'Catalog',
  'mainMenu.InventoryBalanceMenuItem.text': 'Balance',
  'mainMenu.EmployeesMenuItem.text': 'Employees',
  'mainMenu.EmployeesInvitationMenuItem.text': 'Invitation',
  'mainMenu.EmployeesManagementMenuItem.text': 'Management',

  'employeeRegistrationPage.title': 'Employee Sign Up',
  'employeeRegistrationPage.alreadyRegisteredMessage': `
    Your have registered, now ask responsible person to activate your account.
  `,
  'employeeRegistrationPage.tokenCanBeExpiredMessage': `
    If you have not registered yet, but see this message - then it is also possible
    that your invitation is expired - in this case responsible person should create new invitation for you.
  `,
  'employeeRegistrationPage.toMainLink.text': 'To Main Page',
  'employeeRegistrationPage.employeeRegistrationForm.title': 'Employee Sign Up',
  'employeeRegistrationPage.employeeRegistrationForm.nameControl.label': 'Name',
  'employeeRegistrationPage.employeeRegistrationForm.loginControl.label':
    'Login',
  'employeeRegistrationPage.employeeRegistrationForm.passwordControl.label':
    'Password',
  'employeeRegistrationPage.employeeRegistrationForm.submitButton.text':
    'Sign up',

  'loginPage.title': 'Login',
  'loginPage.loginForm.title': 'Login',
  'loginPage.loginForm.loginInput.label': 'Login',
  'loginPage.loginForm.passwordInput.label': 'Password',
  'loginPage.loginForm.submitButton.text': 'Sign in',
  'loginPage.loginForm.loginInput.validationErrorMessages.empty': 'is required',
  'loginPage.loginForm.loginInput.validationErrorMessages.short': 'too short',
  'loginPage.loginForm.passwordInput.validationErrorMessages.empty':
    'is required',

  'dashboardPage.title': 'Dashboard',

  'inventoryCatalogPage.title': 'Inventory Catalog',
  'inventoryCatalogPage.inventoryItemsList.AddNewItemButton.label': 'Add',
  'inventoryCatalogPage.inventoryItemsList.searchItemsControl.label': 'Search',
  'inventoryCatalogPage.inventoryItemsList.filterByTagsControl.label':
    'Filter by tags',
  'inventoryCatalogPage.addNewInventoryItemDialog.title':
    'Add new inventory item',
  'inventoryCatalogPage.inventoryItemDetailsForm.nameControl.label': 'Name',
  'inventoryCatalogPage.inventoryItemDetailsForm.unitsControl.label': 'Units',
  'inventoryCatalogPage.inventoryItemDetailsForm.tagsControl.label': 'Tags',
  'inventoryCatalogPage.inventoryItemDetailsForm.alternatesControl.label':
    'Alternates',

  'inventoryBalancePage.title': 'Inventory Balance',

  'employeeInvitationPage.title': 'Employee Invitation',
  'employeeInvitationPage.invitationForm.rolesSelect.label':
    'Select roles for new employee',
  'employeeInvitationPage.invitationForm.submitButton.text':
    'Generate invitation link',
  'employeeInvitationPage.invitationLink.text':
    'Copy this link and share it with new employee to finish registration',

  'employeeManagementPage.title': 'Employee Management',
  'employeeManagementPage.employeeList.item.noRolesMessage':
    'No roles (permissions)',
  'employeeManagementPage.employeeDetailsForm.nameControl.label': 'Name',
  'employeeManagementPage.employeeDetailsForm.rolesControl.label': 'Roles',

  'employeeManagementPage.editEmployeeDialog.title': 'Edit Employee',

  'errorModal.title': 'Error',
  'errorModal.defaultErrorMessage':
    'Sorry, unexpected error happened. We can not finish your action.',
};

// En translations is used as reference type for other translations
export type AppTranslationMessages = typeof enTranslationMessages;
