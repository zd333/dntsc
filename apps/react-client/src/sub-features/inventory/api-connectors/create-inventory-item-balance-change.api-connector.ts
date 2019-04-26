import { ajax } from 'rxjs/ajax';
import { CreateInventoryBalanceChangeInDto } from '@api/sub-features/inventory/dto/create-inventory-balance-change.in-dto';
import { getApiUrl } from '../../../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../../../shared/helpers/get-auth-headers-for-api-request';
import { InventoryItemVM } from '../selectors/items-dictionary.selector';
import { mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';

const CREATE_INVENTORY_ITEM_BALANCE_CHANGE_PATH = '/inventory/balance-changes';

export const createInventoryItemBalanceChangeApiConnector = (params: {
  readonly itemId: InventoryItemVM['id'];
  readonly amount: number;
  readonly comment?: string;
  readonly authToken: string | undefined;
}): Observable<void> => {
  const { itemId, amount, comment, authToken } = params;
  const url = getApiUrl({ path: CREATE_INVENTORY_ITEM_BALANCE_CHANGE_PATH });
  const headers = getAuthHeadersForApiRequest(authToken);
  const body: CreateInventoryBalanceChangeInDto = {
    amount,
    comment,
    item: itemId,
  };

  return ajax.post(url, body, headers).pipe(mapTo(void 0));
};
