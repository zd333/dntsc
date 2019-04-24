import { ajax } from 'rxjs/ajax';
import { getApiUrl } from '../shared/helpers/get-api-url';
import { mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RegisterEmployeeInDto } from '@api/sub-features/employees/dto/register-employee.in-dto';

const CHECK_EMPLOYEE_REGISTRATION_TOKEN_PATH =
  '/employees/check-registration-token';

/**
 * Throws error if token is invalid.
 */
export const checkEmployeeRegistrationTokenApiConnector = (params: {
  readonly registrationToken: string;
}): Observable<void> => {
  const url = getApiUrl({ path: CHECK_EMPLOYEE_REGISTRATION_TOKEN_PATH });
  const body = params;

  return ajax.post(url, body).pipe(mapTo(void 0));
};
