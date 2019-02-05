import { ajax } from 'rxjs/ajax';
import { getApiUrl } from '../shared/helpers/get-api-url';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TenantDetailsOutDto } from '@api/sub-features/tenants/dto/tenant-details.out-dto';

const GET_TENANT_OF_CURRENT_CLINIC_PATH = '/tenants/clinic_tenant';

// TODO: this is example of auth headers usage, remove it after implemented somewhere
// export const getTenantOfCurrentClinicApiConnector = (params: {
//   readonly authToken: string | undefined;
// }): Observable<TenantDetailsOutDto> => {
//   const url = getApiUrl(GET_TENANT_OF_CURRENT_CLINIC_PATH);
//   const headers = getAuthHeadersForApiRequest(params.authToken);

//   return ajax.get(url, headers).pipe(map(response => response.response));
// };
export const getTenantOfCurrentClinicApiConnector = (): Observable<
  TenantDetailsOutDto
> => {
  const url = getApiUrl(GET_TENANT_OF_CURRENT_CLINIC_PATH);

  return ajax.get(url).pipe(map(response => response.response));
};
