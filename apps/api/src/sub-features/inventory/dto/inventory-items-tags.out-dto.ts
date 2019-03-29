import { Expose } from 'class-transformer';

export class InventoryItemsTagsOutDto {
  @Expose()
  public readonly usedTags: Array<string>;
}
