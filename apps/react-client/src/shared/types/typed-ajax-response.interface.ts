import { AjaxResponse } from 'rxjs/ajax';

export interface TypedAjaxResponse<T> extends Readonly<AjaxResponse> {
  readonly response: T;
}
