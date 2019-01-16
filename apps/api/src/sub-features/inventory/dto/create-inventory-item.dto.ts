import { InDtoWithClinicContext } from 'src/middlewares/add-clinic-context.middleware';
import { IsAlternateWithRelevantUnit } from '../validators/is-alternate-with-relevant-unit.validator';
import { IsIdOfExistingDbEntityValidator } from 'src/sub-features/shared/validators/is-id-of-existing-db-entity.validator';
import { IsUniqueInventoryItemNameForGivenClinic } from '../validators/is-unique-inventory-item-name-for-given-clinic.validator';
import {
  InventoryItemUnits,
  INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
} from '../db-schemas/inventory-item.db-schema';
import {
  IsEnum,
  IsString,
  MinLength,
  ArrayNotEmpty,
  IsOptional,
  ArrayUnique,
  Validate,
} from 'class-validator';

export class CreateInventoryItemInDtoWithClinicContext extends InDtoWithClinicContext {
  @MinLength(3)
  @IsString()
  @Validate(IsUniqueInventoryItemNameForGivenClinic)
  readonly name: string;

  @IsEnum(InventoryItemUnits)
  readonly unit: InventoryItemUnits;

  /**
   * Array of ids of other inventory items that can be used as substitution.
   */
  @IsOptional()
  @ArrayNotEmpty()
  @ArrayUnique()
  // TODO: currently does not work, update class-validator after this PR is merged
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
  readonly alternates?: Array<string>;
}

/**
 * DTO type for clients.
 */
export type CreateInventoryItemInDto = Pick<
  CreateInventoryItemInDtoWithClinicContext,
  Exclude<keyof CreateInventoryItemInDtoWithClinicContext, 'targetClinicId'>
>;
