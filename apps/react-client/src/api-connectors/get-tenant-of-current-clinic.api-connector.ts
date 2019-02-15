import { ajax } from 'rxjs/ajax';
import { getApiUrl } from '../shared/helpers/get-api-url';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TenantDetailsOutDto } from '@api/sub-features/tenants/dto/tenant-details.out-dto';

const GET_TENANT_OF_CURRENT_CLINIC_PATH = '/tenants/clinic_tenant';

export const getTenantOfCurrentClinicApiConnector = (): Observable<
  TenantDetailsOutDto
> => {
  const url = getApiUrl({ path: GET_TENANT_OF_CURRENT_CLINIC_PATH });

  return ajax.get(url).pipe(map(result => result.response));
};
