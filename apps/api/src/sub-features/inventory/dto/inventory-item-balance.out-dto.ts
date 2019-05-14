import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class InventoryItemBalanceOutDto {
  @Expose()
  @ApiModelProperty()
  public readonly balance: number;
}
