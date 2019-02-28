import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { IsIdOfExistingDbEntityValidator } from '../../shared/validators/is-id-of-existing-db-entity.validator';
import { IsUniqueExistingInventoryItemNameForGivenClinic } from '../validators/is-unique-existing-inventory-item-name-for-given-clinic.validator';
import {
  InventoryItemUnits,
  allInventoryItemUnits,
  INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
} from '../db-schemas/inventory-item.db-schema';
import {
  IsString,
  MinLength,
  ArrayNotEmpty,
  IsOptional,
  ArrayUnique,
  Validate,
  IsIn,
} from 'class-validator';

export class UpdateInventoryItemInDtoWithClinicContext extends InDtoWithClinicContext {
  @Validate(IsIdOfExistingDbEntityValidator, [
    INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
  ])
  public readonly id: string;

  @MinLength(3)
  @IsString()
  @Validate(IsUniqueExistingInventoryItemNameForGivenClinic)
  public readonly name: string;

  @IsIn(allInventoryItemUnits)
  public readonly unit: InventoryItemUnits;

  /**
   * Array of ids of other inventory items that can be used as substitution.
   */
  @IsOptional()
  @ArrayNotEmpty()
  @ArrayUnique()
  // TODO: currently does not work, update class-validator after this PR is merged
  /* tslint:disable:comment-format */
  // https://github.com/typestack/class-validator/pull/295
  // or refactor to validate whole array if not merged
  // @Validate(
  //   IsIdOfExistingDbEntityValidator,
  //   [INVENTORY_ITEM_SCHEMA_COLLECTION_NAME],
  //   {
  //     each: true,
  //   },
  // )
  // @Validate(IsAlternateWithRelevantUnit, {
  //   each: true,
  // })
  public readonly alternates?: Array<string>;
}

/**
 * DTO type for clients.
 */
export type UpdateInventoryItemInDto = Pick<
  UpdateInventoryItemInDtoWithClinicContext,
  Exclude<keyof UpdateInventoryItemInDtoWithClinicContext, 'targetClinicId'>
>;
