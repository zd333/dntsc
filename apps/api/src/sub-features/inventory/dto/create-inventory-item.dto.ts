import { InDtoWithClinicContext } from 'src/middlewares/add-clinic-context.middleware';
import { IsIdOfExistingDbEntityValidator } from 'src/sub-features/shared/validators/is-id-of-existing-db-entity.validator';
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

export class CreateInventoryItemInDto extends InDtoWithClinicContext {
  // TODO: add unique for clinic name validator
  @MinLength(3)
  @IsString()
  readonly name: string;

  @IsEnum(InventoryItemUnits)
  readonly unit: InventoryItemUnits;

  /**
   * Array of ids of other inventory items that can be used as substitution.
   */
  @IsOptional()
  @ArrayNotEmpty()
  @ArrayUnique()
  // TODO: add validator that checks if alternates have relevant units (kg-g-mg, l-ml, pcs, etc)
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
  readonly alternates?: Array<string>;
}
