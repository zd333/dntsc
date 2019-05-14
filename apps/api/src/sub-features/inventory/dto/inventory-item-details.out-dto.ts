import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  InventoryItemUnits,
  allInventoryItemUnits,
} from '../db-schemas/inventory-item.db-schema';

export class InventoryItemDetailsOutDto {
  @Expose()
  @ApiModelProperty()
  public readonly id: string;

  @Expose()
  @ApiModelProperty()
  public readonly name: string;

  @Expose()
  @ApiModelProperty({
    enum: allInventoryItemUnits,
  })
  public readonly unit: InventoryItemUnits;

  @Expose()
  @Type(() => String)
  @ApiModelPropertyOptional()
  public readonly tags?: Array<string>;

  @Expose()
  @Type(() => String)
  @ApiModelPropertyOptional()
  public readonly alternates?: Array<string>;
}
