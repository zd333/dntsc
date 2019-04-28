This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Adding new page

- add new entry to `AppRouePaths` and define path mappings
- add new entry to `appRoutesMatchSelectors`
- optionally (only if makes sense) add is busy selector (like `dashboardPageIsBusy`) and add entry with this selector to `selectCurrentPageIsBusy`
- add translations (at least page title)
- add new entry to `selectCurrentPageName`
- if page availability is conditional (depends on permissions, enabled features, etc.) - then add boolean selector that indicates if it is currently enabled (e.g. `selectIsEmployeesManagementAllowedToCurrentUser`) and apply this selector in `MainMenu` (through `ShellContainer`) and in `AppRoutes` (through `AppRoutesContainer`)
