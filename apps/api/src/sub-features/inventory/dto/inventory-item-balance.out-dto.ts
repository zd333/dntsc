import { Expose } from 'class-transformer';

export class InventoryItemBalanceOutDto {
  @Expose()
  readonly balance: number;
}
