import { IsLowercase, IsOptional, Matches } from 'class-validator';
import { QueryParamsForSearchablePaginatedListInDto } from '../../shared/dto/query-params-for-paginated-list.in-dto';

export class InventoryItemsSearchParams extends QueryParamsForSearchablePaginatedListInDto {
  /**
   * Comma-separated list of tags.
   */
  @IsOptional()
  @Matches(/^\w+(,\w+)*$/)
  @IsLowercase()
  public tags?: string;
}
