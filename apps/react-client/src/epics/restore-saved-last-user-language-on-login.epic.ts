import { AllAppActions, AppEpicsDependencies, RootState } from '..';
import { AppLanguages } from '../reducers/session-state.interface';
import { EMPTY, of as observableOf } from 'rxjs';
import { Epic } from 'redux-observable';
import { getSavedUserLanguageLocalStorageKey } from './save-last-user-language.epic';
import { ofType } from '@martin_hotell/rex-tils';
import { SessionActions, SessionActionTypes } from '../actions/session.actions';
import { switchMap } from 'rxjs/operators';

export const restoreSavedLastUserLanguageOnLoginEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { localStorageService }) =>
  action$.pipe(
    ofType(SessionActionTypes.LOGIN_SUCCESS),
    switchMap(action => {
      const { userName } = action.payload;
      const key = getSavedUserLanguageLocalStorageKey(userName);
      const savedLanguage = localStorageService.getItem(key);

      return savedLanguage
        ? observableOf(
            SessionActions.changeLanguage({
              language: savedLanguage as AppLanguages,
            }),
          )
        : // No saved language for this user - nothing to dispatch
          EMPTY;
    }),
  );
