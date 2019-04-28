import { ajax } from 'rxjs/ajax';
import { getApiUrl } from '../../../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../../../shared/helpers/get-auth-headers-for-api-request';
import { InventoryItemBalanceOutDto } from '@api/sub-features/inventory/dto/inventory-item-balance.out-dto';
import { InventoryItemVM } from '../selectors/items-dictionary.selector';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TypedAjaxResponse } from '../../../shared/types/typed-ajax-response.interface';

const GET_INVENTORY_ITEMS_CURRENT_BALANCE = (id: string) =>
  `/inventory/items/${id}/current-balance`;

export const getCurrentBalanceOfInventoryItemApiConnector = (params: {
  readonly id: InventoryItemVM['id'];
  readonly authToken: string | undefined;
}): Observable<InventoryItemBalanceOutDto> => {
  const url = getApiUrl({
    path: GET_INVENTORY_ITEMS_CURRENT_BALANCE(params.id),
  });
  const headers = getAuthHeadersForApiRequest(params.authToken);

  return ajax
    .get(url, headers)
    .pipe(
      map(
        (response: TypedAjaxResponse<InventoryItemBalanceOutDto>) =>
          response.response,
      ),
    );
};
