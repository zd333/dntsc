import { InDtoWithClinicContext } from 'src/middlewares/add-clinic-context.middleware';
import { InventoryItemUnits } from '../db-schemas/inventory-item.db-schema';
import { IsUniqueInventoryItemNameForGivenClinic } from '../validators/is-unique-inventory-item-name-for-given-clinic.validator';
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
  public readonly name: string;

  @IsEnum(InventoryItemUnits)
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
export type CreateInventoryItemInDto = Pick<
  CreateInventoryItemInDtoWithClinicContext,
  Exclude<keyof CreateInventoryItemInDtoWithClinicContext, 'targetClinicId'>
>;