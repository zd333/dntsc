import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { INVENTORY_ITEM_NAME_MIN_LENGTH } from './create-inventory-item.in-dto';
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
  IsLowercase,
} from 'class-validator';

export class UpdateInventoryItemInDtoWithClinicContext extends InDtoWithClinicContext {
  @Validate(IsIdOfExistingDbEntityValidator, [
    INVENTORY_ITEM_SCHEMA_COLLECTION_NAME,
  ])
  @ApiModelProperty()
  public readonly id: string;

  @MinLength(INVENTORY_ITEM_NAME_MIN_LENGTH)
  @IsString()
  @Validate(IsUniqueExistingInventoryItemNameForGivenClinic)
  @ApiModelProperty({
    minLength: INVENTORY_ITEM_NAME_MIN_LENGTH,
  })
  public readonly name: string;

  @IsIn(allInventoryItemUnits)
  @ApiModelProperty({
    enum: allInventoryItemUnits,
  })
  public readonly unit: InventoryItemUnits;

  @IsOptional()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsLowercase({ each: true })
  @ApiModelPropertyOptional({
    isArray: true,
    uniqueItems: true,
    minLength: 1,
  })
  public readonly tags?: Array<string> | null;

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
  @ApiModelPropertyOptional({
    isArray: true,
    uniqueItems: true,
    minLength: 1,
  })
  public readonly alternates?: Array<string> | null;
}

/**
 * DTO type for clients.
 */
export type UpdateInventoryItemInDto = Pick<
  UpdateInventoryItemInDtoWithClinicContext,
  Exclude<keyof UpdateInventoryItemInDtoWithClinicContext, 'targetClinicId'>
>;
