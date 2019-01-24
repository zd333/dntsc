import { ajax } from 'rxjs/ajax';
import { getApiUrl } from '../shared/helpers/get-api-url';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// import { SignedInEmployeeOutDto } from '@api/sub-features/authentication/dto/signed-in-employee.out-dto';
// import { SignInEmployeeInDto } from '@api/sub-features/authentication/dto/sign-in-employee.in-dto';
// import {  } from '@api/'

const SIGN_IN_EMPLOYEE_PATH = '/auth/sign-in-employee';

export const signInApiConnector = (
  params: any,
): Observable<{
  readonly authToken: string;
  readonly hasToChangePassword: boolean;
}> => {
  const url = getApiUrl(SIGN_IN_EMPLOYEE_PATH);
  const body = params;
  // TODO: test this
  return ajax.post(url, body).pipe(map(response => response.response));
};
