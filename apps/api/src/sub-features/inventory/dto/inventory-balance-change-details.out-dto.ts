import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class InventoryBalanceChangeDetailsOutDto {
  @Expose()
  @ApiModelProperty()
  public readonly id: string;

  @Expose()
  @Transform(value =>
    typeof value.toHexString === 'function'
      ? value.toHexString()
      : String(value),
  )
  @ApiModelProperty()
  public readonly item: string;

  @Expose()
  @ApiModelProperty()
  public readonly amount: number;

  @Expose()
  @ApiModelPropertyOptional()
  public readonly comment?: string;

  @Expose()
  @ApiModelProperty({
    type: String,
    description: 'ISO date/time string',
  })
  public readonly createdAt: Date;
}
