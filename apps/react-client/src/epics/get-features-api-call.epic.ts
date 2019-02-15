import { AppEpicsDependencies, RootState } from '../../src';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { of as observableOf } from 'rxjs';
import { ofType } from '@martin_hotell/rex-tils';
import {
  SessionActionTypes,
  AllSessionActions,
  SessionActions,
} from '../../src/actions/session.actions';

export const getFeaturesApiCallEpic: Epic<
  AllSessionActions,
  AllSessionActions,
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
          observableOf(SessionActions.getFeaturesError({ error })),
        ),
      ),
    ),
  );
