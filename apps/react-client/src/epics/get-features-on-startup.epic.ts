import { Epic } from 'redux-observable';
import { of as observableOf } from 'rxjs';
import { SessionActions } from '../actions/session.actions';

export const getFeaturesOnStartupEpic: Epic = () =>
  observableOf(SessionActions.getFeaturesStart());
