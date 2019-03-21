import { ajax } from 'rxjs/ajax';
import { getApiUrl } from '../../../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../../../shared/helpers/get-auth-headers-for-api-request';
import { InventoryItem } from '../selectors/items-dictionary.selector';
import { mapTo } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Omitted } from '../../../shared/types/omitted.type';
import { UpdateInventoryItemInDto } from '@api/sub-features/inventory/dto/update-inventory-item.in-dto';

const UPDATE_INVENTORY_ITEM_PATH = (id: string) => `/inventory/items/${id}`;

export const updateInventoryItemApiConnector = (params: {
  readonly id: InventoryItem['id'];
  readonly itemUpdates: Omitted<InventoryItem, 'id'>;
  readonly authToken: string | undefined;
}): Observable<void> => {
  const url = getApiUrl({ path: UPDATE_INVENTORY_ITEM_PATH(params.id) });
  const headers = getAuthHeadersForApiRequest(params.authToken);
  const {
    alternates: viewModelAlternates,
    tags: viewModelTags,
    ...itemDataWithoutAlternates
  } = params.itemUpdates;
  const alternates =
    viewModelAlternates && viewModelAlternates.length
      ? viewModelAlternates.map(alternate => alternate.id)
      : undefined;
  const tags =
    viewModelTags && viewModelTags.length ? viewModelTags : undefined;
  const body: UpdateInventoryItemInDto = {
    ...itemDataWithoutAlternates,
    ...(alternates
      ? {
          alternates,
        }
      : {}),
    ...(tags
      ? {
          tags,
        }
      : {}),
    id: params.id,
  };

  return ajax.put(url, body, headers).pipe(mapTo(void 0));
};
