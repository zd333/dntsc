import { AllAppActions, AppEpicsDependencies, RootState } from '../../src';
import { catchError, map, switchMap } from 'rxjs/operators';
import { createAppEpicErrorAction } from '../shared/helpers/create-app-epic-error-action';
import { Epic } from 'redux-observable';
import { ofType } from '@martin_hotell/rex-tils';
import { SessionActions, SessionActionTypes } from '../actions/session.actions';

export const getFeaturesApiCallEpic: Epic<
  AllAppActions,
  AllAppActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { getTenantOfCurrentClinicApiConnector }) =>
  action$.pipe(
    ofType(SessionActionTypes.GET_FEATURES_START),
    switchMap(() =>
      getTenantOfCurrentClinicApiConnector().pipe(
        map(dto =>
          SessionActions.getFeaturesSuccess({ features: dto.features }),
        ),
        catchError(error =>
          createAppEpicErrorAction(
            error,
            SessionActions.getFeaturesError({ error }),
          ),
        ),
      ),
    ),
  );
