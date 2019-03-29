import { ajax } from 'rxjs/ajax';
import { getApiUrl } from '../../../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../../../shared/helpers/get-auth-headers-for-api-request';
import { InventoryItemsTagsOutDto } from '@api/sub-features/inventory/dto/inventory-items-tags.out-dto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TypedAjaxResponse } from '../../../shared/types/typed-ajax-response.interface';

const GET_INVENTORY_ITEMS_TAGS = '/inventory/items-tags';

export const getUsedInInventoryItemsTagsApiConnector = (params: {
  readonly authToken: string | undefined;
}): Observable<Array<string>> => {
  const url = getApiUrl({ path: GET_INVENTORY_ITEMS_TAGS });
  const headers = getAuthHeadersForApiRequest(params.authToken);

  return ajax
    .get(url, headers)
    .pipe(
      map(
        (response: TypedAjaxResponse<InventoryItemsTagsOutDto>) =>
          response.response.usedTags,
      ),
    );
};
