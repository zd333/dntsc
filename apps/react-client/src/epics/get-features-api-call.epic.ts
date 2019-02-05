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

// TODO: this is example of signing request, remove after used it somewhere
// export const getFeaturesApiCallEpic: Epic<
//   AllSessionActions,
//   AllSessionActions,
//   RootState,
//   AppEpicsDependencies
// > = (action$, state$, { getFeaturesApiConnector }) => {
//   const authToken$ = state$.pipe(map(selectAuthToken));

//   return action$.pipe(
//     ofType(SessionActionTypes.GET_FEATURES_START),
//     withLatestFrom(authToken$),
//     switchMap(([action, authToken]) =>
//       getFeaturesApiConnector({ authToken }).pipe(
//         map(dto =>
//           SessionActions.getFeaturesSuccess({ features: dto.features }),
//         ),
//         catchError(error =>
//           observableOf(SessionActions.getFeaturesError({ error })),
//         ),
//       ),
//     ),
//   );
// };
export const getFeaturesApiCallEpic: Epic<
  AllSessionActions,
  AllSessionActions,
  RootState,
  AppEpicsDependencies
> = (action$, state$, { getFeaturesApiConnector }) =>
  action$.pipe(
    ofType(SessionActionTypes.GET_FEATURES_START),
    switchMap(() =>
      getFeaturesApiConnector().pipe(
        map(dto =>
          SessionActions.getFeaturesSuccess({ features: dto.features }),
        ),
        catchError(error =>
          observableOf(SessionActions.getFeaturesError({ error })),
        ),
      ),
    ),
  );
