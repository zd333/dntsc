import { ajax } from 'rxjs/ajax';
import { getApiUrl } from '../shared/helpers/get-api-url';
import { mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RegisterEmployeeInDto } from '@api/sub-features/employees/dto/register-employee.in-dto';

const REGISTER_EMPLOYEE_PATH = '/employees/register';

export const registerEmployeeApiConnector = (
  params: RegisterEmployeeInDto,
): Observable<void> => {
  const url = getApiUrl({ path: REGISTER_EMPLOYEE_PATH });
  const body = params;

  return ajax.post(url, body).pipe(mapTo(void 0));
};
