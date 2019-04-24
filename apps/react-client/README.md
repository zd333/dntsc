This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Adding new page

- add new entry to `AppRouePaths` and define path mappings
- add new entry to `appRoutesMatchSelectors`
- add is busy selector (like `dashboardPageIsBusy`) and add entry with this selector to `selectCurrentPageIsBusy`
- add translations (at least page title)
- add new entry to `selectCurrentPageName` TODO: ?
- if page availability is conditional (depends on permissions, enabled features, etc.) - then add boolean selector that indicates if it is currently enabled and apply this selector in `MainMenu` (through `ShellContainer`) and in app routes
