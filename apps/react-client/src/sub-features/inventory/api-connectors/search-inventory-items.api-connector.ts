import { ajax } from 'rxjs/ajax';
import { getApiUrl } from '../../../shared/helpers/get-api-url';
import { getAuthHeadersForApiRequest } from '../../../shared/helpers/get-auth-headers-for-api-request';
import { InventoryItem } from '../selectors/items-dictionary.selector';
import { InventoryItemDetailsOutDto } from '@api/sub-features/inventory/dto/inventory-item-details.out-dto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PaginatedListOutDto } from '@api/sub-features/shared/dto/paginated-list-out-dto.interface';
import { TypedAjaxResponse } from '../../../shared/types/typed-ajax-response.interface';

const SEARCH_INVENTORY_ITEMS_PATH = '/inventory/items';
const ITEMS_PER_CALL_LIMIT = 100;

export const searchInventoryItemsApiConnector = (params: {
  readonly searchString?: string;
  readonly tagsToFilterBy?: Array<string>;
  readonly alternatesOf?: InventoryItemDetailsOutDto['id'];
  readonly unitToFilterBy?: InventoryItem['unit'];
  readonly authToken: string | undefined;
}): Observable<PaginatedListOutDto<InventoryItemDetailsOutDto>> => {
  const queryParams = [
    { name: 'limit', value: ITEMS_PER_CALL_LIMIT },
    ...(params.searchString
      ? [{ name: 'searchString', value: params.searchString }]
      : []),
    ...(params.tagsToFilterBy && params.tagsToFilterBy.length > 0
      ? [{ name: 'tags', value: params.tagsToFilterBy.join(',') }]
      : []),
    ...(params.alternatesOf
      ? [{ name: 'alternates_of', value: params.alternatesOf }]
      : []),
    ...(params.unitToFilterBy
      ? [{ name: 'unit', value: params.unitToFilterBy }]
      : []),
  ];
  const url = getApiUrl({ path: SEARCH_INVENTORY_ITEMS_PATH, queryParams });
  const headers = getAuthHeadersForApiRequest(params.authToken);

  return ajax
    .get(url, headers)
    .pipe(
      map(
        (
          response: TypedAjaxResponse<
            PaginatedListOutDto<InventoryItemDetailsOutDto>
          >,
        ) => response.response,
      ),
    );
};
