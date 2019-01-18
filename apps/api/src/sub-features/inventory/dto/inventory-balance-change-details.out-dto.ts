import { Expose, Transform } from 'class-transformer';

export class InventoryBalanceChangeDetailsOutDto {
  @Expose()
  public readonly id: string;

  @Expose()
  @Transform(value =>
    typeof value.toHexString === 'function'
      ? value.toHexString()
      : String(value),
  )
  public readonly item: string;

  @Expose()
  public readonly amount: number;

  @Expose()
  public readonly comment?: string;

  @Expose()
  public readonly createdAt: Date;
}
