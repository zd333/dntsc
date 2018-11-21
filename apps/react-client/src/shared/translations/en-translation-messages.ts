export const enTranslationMessages = {
  'loginPage.loginForm.title': 'Login',
  'loginPage.loginForm.emailInput.label': 'Email',
  'loginPage.loginForm.passwordInput.label': 'Password',
  'loginPage.loginForm.submitButton.text': 'Login',
  'loginPage.loginForm.emailInput.validationErrorMessages.empty': 'is required',
  'loginPage.loginForm.emailInput.validationErrorMessages.invalid': 'not email',
  'loginPage.loginForm.passwordInput.validationErrorMessages.empty':
    'is required',
  'errorModal.title': 'Error',
  'errorModal.defaultErrorMessage':
    'Sorry, unexpected error happened. We can not finish your action.',
};

// En translations is used as reference type for other translations
export type AppTranslationMessages = typeof enTranslationMessages;
