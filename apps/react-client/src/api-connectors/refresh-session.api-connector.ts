import { ajax } from 'rxjs/ajax';
import { getApiUrl } from '../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../shared/helpers/get-auth-headers-for-api-request';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RefreshAuthInDto } from '@api/sub-features/authentication/dto/refresh-auth.in-dto';
import { SignedInEmployeeOutDto } from '@api/sub-features/authentication/dto/signed-in-employee.out-dto';
import { TypedAjaxResponse } from '../shared/types/typed-ajax-response.interface';

const REFRESH_SESSION_PATH = '/auth/refresh-employee-session';

export const refreshSessionApiConnector = (params: {
  readonly refreshToken: string;
}): Observable<SignedInEmployeeOutDto> => {
  const url = getApiUrl({ path: REFRESH_SESSION_PATH });
  const { refreshToken } = params;
  const body: RefreshAuthInDto = { refreshToken };

  return ajax
    .post(url, body)
    .pipe(
      map(
        (response: TypedAjaxResponse<SignedInEmployeeOutDto>) =>
          response.response,
      ),
    );
};
