import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { INVENTORY_ITEM_SCHEMA_COLLECTION_NAME } from '../db-schemas/inventory-item.db-schema';
import { IsIdOfExistingDbEntityValidator } from '../../../sub-features/shared/validators/is-id-of-existing-db-entity.validator';
import { IsNumber, IsOptional, IsString, Validate } from 'class-validator';

export class CreateInventoryBalanceChangeInDtoWithClinicContext extends InDtoWithClinicContext {
  /**
   * Inventory item id.
   */
  @Validate(IsIdOfExistingDbEntityValidator, [
    INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
  ])
  public readonly item: string;

  /**
   * Change amount (positive means items are bought and come to inventory,
   * negative means items are consumed and go out from inventory).
   */
  @IsNumber()
  public readonly amount: number;

  @IsOptional()
  @IsString()
  public readonly comment?: string;
}

/**
 * DTO type for clients.
 */
export type CreateInventoryBalanceChangeInDto = Pick<
  CreateInventoryBalanceChangeInDtoWithClinicContext,
  Exclude<
    keyof CreateInventoryBalanceChangeInDtoWithClinicContext,
    'targetClinicId'
  >
>;
