import { Expose, Transform } from 'class-transformer';

export class InventoryBalanceChangeDetailsOutDto {
  @Expose()
  readonly id: string;

  @Expose()
  @Transform(value =>
    typeof value.toHexString === 'function'
      ? value.toHexString()
      : String(value),
  )
  readonly item: string;

  @Expose()
  readonly amount: number;

  @Expose()
  readonly comment?: string;

  @Expose()
  readonly createdAt: Date;
}
