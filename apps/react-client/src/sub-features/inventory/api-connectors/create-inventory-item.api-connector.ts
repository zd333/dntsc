import { ajax } from 'rxjs/ajax';
import { CreatedInventoryItemOutDto } from '@api/sub-features/inventory/dto/created-inventory-item.out-dto';
import { CreateInventoryItemInDto } from '@api/sub-features/inventory/dto/create-inventory-item.in-dto';
import { getApiUrl } from '../../../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../../../shared/helpers/get-auth-headers-for-api-request';
import { InventoryItem } from '../selectors/items-dictionary.selector';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Omitted } from '../../../shared/types/omitted.type';
import { TypedAjaxResponse } from '../../../shared/types/typed-ajax-response.interface';

const CREATE_INVENTORY_ITEM_PATH = '/inventory/items';

export const createInventoryItemApiConnector = (params: {
  readonly newItemData: Omitted<InventoryItem, 'id'>;
  readonly authToken: string | undefined;
}): Observable<{ readonly id: string }> => {
  const url = getApiUrl({ path: CREATE_INVENTORY_ITEM_PATH });
  const headers = getAuthHeadersForApiRequest(params.authToken);
  const {
    alternates: viewModelAlternates,
    tags: viewModelTags,
    ...itemDataWithoutAlternatesAndTags
  } = params.newItemData;
  const alternates =
    viewModelAlternates && viewModelAlternates.length
      ? viewModelAlternates.map(alternate => alternate.id)
      : undefined;
  const tags =
    viewModelTags && viewModelTags.length ? viewModelTags : undefined;
  const body: CreateInventoryItemInDto = {
    ...itemDataWithoutAlternatesAndTags,
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
  };

  return ajax.post(url, body, headers).pipe(
    map((response: TypedAjaxResponse<CreatedInventoryItemOutDto>) => ({
      id: response.response.id,
    })),
  );
};
