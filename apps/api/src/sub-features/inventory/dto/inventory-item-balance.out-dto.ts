import { Expose } from 'class-transformer';

export class InventoryItemBalanceOutDto {
  @Expose()
  public readonly balance: number;
}
