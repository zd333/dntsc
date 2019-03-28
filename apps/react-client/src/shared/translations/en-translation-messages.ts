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

  'errorModal.title': 'Error',
  'errorModal.defaultErrorMessage':
    'Sorry, unexpected error happened. We can not finish your action.',
};

// En translations is used as reference type for other translations
export type AppTranslationMessages = typeof enTranslationMessages;
