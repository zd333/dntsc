import { ajax } from 'rxjs/ajax';
import { EmployeeVM } from '../components/EmployeeListItem';
import { getApiUrl } from '../../../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../../../shared/helpers/get-auth-headers-for-api-request';
import { mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Omitted } from '../../../shared/types/omitted.type';
import { UpdateEmployeeInDto } from '@api/sub-features/employees/dto/update-employee.in-dto';

const UPDATE_EMPLOYEE_PATH = (id: string) => `/employees/${id}`;

export const updateEmployeeApiConnector = (params: {
  readonly authToken?: string;
  readonly id: EmployeeVM['id'];
  readonly employeeUpdates: Omitted<EmployeeVM, 'id'>;
}): Observable<void> => {
  const url = getApiUrl({ path: UPDATE_EMPLOYEE_PATH(params.id) });
  const headers = getAuthHeadersForApiRequest(params.authToken);
  const body: UpdateEmployeeInDto = {
    id: params.id,
    ...params.employeeUpdates,
  };

  return ajax.put(url, body, headers).pipe(mapTo(void 0));
};
