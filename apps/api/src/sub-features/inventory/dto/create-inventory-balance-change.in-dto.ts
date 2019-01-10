import { CLINIC_SCHEMA_COLLECTION_NAME } from 'src/sub-features/clinics/db-schemas/clinic.db-schema';
import { InDtoWithClinicContext } from 'src/middlewares/add-clinic-context.middleware';
import { INVENTORY_ITEM_SCHEMA_COLLECTION_NAME } from '../db-schemas/inventory-item.db-schema';
import { IsIdOfExistingDbEntityValidator } from 'src/sub-features/shared/validators/is-id-of-existing-db-entity.validator';
import {
  IsNumber,
  IsOptional,
  IsString,
  Validate
  } from 'class-validator';

export class CreateInventoryBalanceChangeInDto extends InDtoWithClinicContext {
  /**
   * Inventory item id.
   */
  @Validate(IsIdOfExistingDbEntityValidator, [
    INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
  ])
  readonly item: string;

  /**
   * Change amount (positive means items are bought and come to inventory,
   * negative means items are consumed and go out from inventory).
   */
  @IsNumber()
  readonly amount: number;

  @IsOptional()
  @IsString()
  readonly comment: string;
}
