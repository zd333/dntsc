import { ajax } from 'rxjs/ajax';
import { AppAccessRoles } from '@api/app-access-roles';
import { CreateEmployeeRegistrationTokenInDto } from '@api/sub-features/employees/dto/create-employee-registration-token.in-dto';
import { EmployeeRegistrationTokenOutDto } from '@api/sub-features/employees/dto/employee-registration-token.out-dto';
import { getApiUrl } from '../../../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../../../shared/helpers/get-auth-headers-for-api-request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TypedAjaxResponse } from '../../../shared/types/typed-ajax-response.interface';

const CREATE_REGISTRATION_TOKEN_PATH = '/employees/create-registration-token';

export const createEmployeeRegistrationTokenApiConnector = (params: {
  readonly authToken: string | undefined;
  readonly roles?: Array<AppAccessRoles>;
}): Observable<string> => {
  const { authToken, roles } = params;
  const url = getApiUrl({ path: CREATE_REGISTRATION_TOKEN_PATH });
  const headers = getAuthHeadersForApiRequest(authToken);
  const body: CreateEmployeeRegistrationTokenInDto = { roles };

  return ajax
    .post(url, body, headers)
    .pipe(
      map(
        (response: TypedAjaxResponse<EmployeeRegistrationTokenOutDto>) =>
          response.response.registrationToken,
      ),
    );
};
