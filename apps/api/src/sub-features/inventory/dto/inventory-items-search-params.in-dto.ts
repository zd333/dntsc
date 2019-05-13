import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsIdOfExistingDbEntityValidator } from '../../shared/validators/is-id-of-existing-db-entity.validator';
import { IsIn, IsLowercase, IsOptional, Validate } from 'class-validator';
import { QueryParamsForSearchablePaginatedListInDto } from '../../shared/dto/query-params-for-paginated-list.in-dto';
import {
  INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
  allInventoryItemUnits,
  InventoryItemUnits,
} from '../db-schemas/inventory-item.db-schema';

export class InventoryItemsSearchParams extends QueryParamsForSearchablePaginatedListInDto {
  @IsOptional()
  // TODO: this does not work with ru, ua words, fix
  // @Matches(/^\w+(,\w+)*$/)
  @IsLowercase()
  @ApiModelPropertyOptional({
    description: 'Comma-separated list of tags. Should be lowercase.',
  })
  public tags?: string;

  @IsOptional()
  @Validate(IsIdOfExistingDbEntityValidator, [
    INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
  ])
  @ApiModelPropertyOptional({
    description: 'Id of inventory item to search alternates.',
  })
  // URL query param is better to be underscore
  /* tslint:disable-next-line:variable-name */
  public alternates_of?: string;

  @IsOptional()
  @IsIn(allInventoryItemUnits)
  @ApiModelPropertyOptional({
    description: 'Id of inventory item to search alternates.',
    enum: allInventoryItemUnits,
  })
  public readonly unit?: InventoryItemUnits;
}
