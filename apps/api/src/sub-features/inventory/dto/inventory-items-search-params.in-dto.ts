import { IsIdOfExistingDbEntityValidator } from '../../shared/validators/is-id-of-existing-db-entity.validator';
import { QueryParamsForSearchablePaginatedListInDto } from '../../shared/dto/query-params-for-paginated-list.in-dto';
import {
  INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
  allInventoryItemUnits,
  InventoryItemUnits,
} from '../db-schemas/inventory-item.db-schema';
import {
  IsLowercase,
  IsOptional,
  Matches,
  Validate,
  IsIn,
} from 'class-validator';

export class InventoryItemsSearchParams extends QueryParamsForSearchablePaginatedListInDto {
  /**
   * Comma-separated list of tags.
   */
  @IsOptional()
  @Matches(/^\w+(,\w+)*$/)
  @IsLowercase()
  public tags?: string;

  /**
   * Id of inventory item to search alternates.
   */
  @IsOptional()
  @Validate(IsIdOfExistingDbEntityValidator, [
    INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
  ])
  // URL query param is better to be underscore
  /* tslint:disable-next-line:variable-name */
  public alternates_of?: string;

  @IsOptional()
  @IsIn(allInventoryItemUnits)
  public readonly unit?: InventoryItemUnits;
}
