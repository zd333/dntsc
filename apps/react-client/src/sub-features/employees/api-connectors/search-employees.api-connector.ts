import { ajax } from 'rxjs/ajax';
import { EmployeeDetailsOutDto } from '../../../../../api/src/sub-features/employees/dto/employee-details.out-dto';
import { getApiUrl } from '../../../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../../../shared/helpers/get-auth-headers-for-api-request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PaginatedListOutDto } from '@api/sub-features/shared/dto/paginated-list-out-dto.interface';
import { TypedAjaxResponse } from '../../../shared/types/typed-ajax-response.interface';

const SEARCH_EMPLOYEES_PATH = '/employees';

export const searchEmployeesApiConnector = (params: {
  readonly authToken: string | undefined;
}): Observable<PaginatedListOutDto<EmployeeDetailsOutDto>> => {
  const url = getApiUrl({ path: SEARCH_EMPLOYEES_PATH });
  const headers = getAuthHeadersForApiRequest(params.authToken);

  return ajax
    .get(url, headers)
    .pipe(
      map(
        (
          response: TypedAjaxResponse<
            PaginatedListOutDto<EmployeeDetailsOutDto>
          >,
        ) => response.response,
      ),
    );
};
