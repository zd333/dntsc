import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatedInventoryItemOutDto {
  @Expose()
  @ApiModelProperty()
  public readonly id: string;
}
