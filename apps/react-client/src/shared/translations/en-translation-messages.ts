export const enTranslationMessages = {
  defaultPageTitle: 'Clinic Management',

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

  'mainMenu.InventoryMenuItem.text': 'Inventory',
  'mainMenu.InventoryCatalogMenuItem.text': 'Catalog',

  'loginPage.title': 'Login',
  'loginPage.loginForm.title': 'Login',
  'loginPage.loginForm.emailInput.label': 'Email',
  'loginPage.loginForm.passwordInput.label': 'Password',
  'loginPage.loginForm.submitButton.text': 'Login',
  'loginPage.loginForm.emailInput.validationErrorMessages.empty': 'is required',
  'loginPage.loginForm.emailInput.validationErrorMessages.invalid': 'not email',
  'loginPage.loginForm.passwordInput.validationErrorMessages.empty':
    'is required',

  'dashboardPage.title': 'Dashboard',

  'InventoryCatalogPage.title': 'Inventory Catalog',

  'errorModal.title': 'Error',
  'errorModal.defaultErrorMessage':
    'Sorry, unexpected error happened. We can not finish your action.',
};

// En translations is used as reference type for other translations
export type AppTranslationMessages = typeof enTranslationMessages;
