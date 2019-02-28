import { ajax } from 'rxjs/ajax';
import { getApiUrl } from '../../../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../../../shared/helpers/get-auth-headers-for-api-request';
import { InventoryItem } from '../components/InventoryItemsList';
import { mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UpdateInventoryItemInDto } from '@api/sub-features/inventory/dto/update-inventory-item.in-dto';

const UPDATE_INVENTORY_ITEM_PATH = (id: string) => `/inventory/items/${id}`;

export const updateInventoryItemApiConnector = (params: {
  readonly id: InventoryItem['id'];
  readonly item: Pick<InventoryItem, 'name' | 'unit' | 'alternates'>;
  readonly authToken: string | undefined;
}): Observable<void> => {
  const url = getApiUrl({ path: UPDATE_INVENTORY_ITEM_PATH(params.id) });
  const headers = getAuthHeadersForApiRequest(params.authToken);
  const body: UpdateInventoryItemInDto = {
    id: params.id,
    name: params.item.name,
    unit: params.item.unit,
    ...(params.item.alternates && params.item.alternates.length
      ? { alternates: params.item.alternates.map(alternate => alternate.id) }
      : {}),
  };

  return ajax.put(url, body, headers).pipe(mapTo(void 0));
};
