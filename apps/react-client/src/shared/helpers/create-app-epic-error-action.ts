import { AjaxError } from 'rxjs/ajax';
import { AllAppActions } from '../..';
import { Observable, of as observableOf } from 'rxjs';
import { SessionActions } from '../../actions/session.actions';

/**
 * Kind of substitution of global API error interceptor.
 * !Always use this helper to create error actions in all error handlings statements of all epics
 * (instead of `observableOf(someErrorAction)` statements).
 * Returns logout action if error code is 401 or passed error action in all other cases.
 * Add here any error handling logic that must be provided globally.
 */
export function createAppEpicErrorAction(
  error: AjaxError,
  errorAction: AllAppActions,
): Observable<AllAppActions> {
  return error && error.status === 401
    ? observableOf(SessionActions.logout())
    : observableOf(errorAction);
}
