import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class InventoryItemsTagsOutDto {
  @Expose()
  @ApiModelProperty()
  public readonly usedTags: Array<string>;
}
