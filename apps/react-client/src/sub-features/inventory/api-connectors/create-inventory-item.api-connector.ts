import { ajax } from 'rxjs/ajax';
import { CreateInventoryItemInDto } from '@api//sub-features/inventory/dto/create-inventory-item.dto';
import { getApiUrl } from '../../../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../../../shared/helpers/get-auth-headers-for-api-request';
import { InventoryItem } from '../components/InventoryItemsList';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const CREATE_INVENTORY_ITEM_PATH = '/inventory/items';

export const createInventoryItemApiConnector = (params: {
  readonly item: Pick<InventoryItem, 'name' | 'unit' | 'alternates'>;
  readonly authToken: string | undefined;
}): Observable<{ readonly id: string }> => {
  const url = getApiUrl({ path: CREATE_INVENTORY_ITEM_PATH });
  const headers = getAuthHeadersForApiRequest(params.authToken);
  const body: CreateInventoryItemInDto = {
    name: params.item.name,
    unit: params.item.unit,
    ...(params.item.alternates && params.item.alternates.length
      ? { alternates: params.item.alternates.map(alternate => alternate.id) }
      : {}),
  };

  return ajax
    .post(url, body, headers)
    .pipe(map(result => ({ id: result.response.id })));
};
