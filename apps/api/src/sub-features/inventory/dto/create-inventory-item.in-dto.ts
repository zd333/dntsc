import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { IsUniqueInventoryItemNameForGivenClinic } from '../validators/is-unique-inventory-item-name-for-given-clinic.validator';
import {
  InventoryItemUnits,
  allInventoryItemUnits,
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

export const INVENTORY_ITEM_NAME_MIN_LENGTH = 3;

export class CreateInventoryItemInDtoWithClinicContext extends InDtoWithClinicContext {
  @MinLength(INVENTORY_ITEM_NAME_MIN_LENGTH)
  @IsString()
  @Validate(IsUniqueInventoryItemNameForGivenClinic)
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
    description: `
      Use tags to categorize and group items.
      Tags should be lower case.
    `,
  })
  public readonly tags?: Array<string>;

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
    description:
      'Array of ids of other inventory items that can be used as substitution.',
  })
  public readonly alternates?: Array<string>;
}

/**
 * DTO type for clients.
 */
export type CreateInventoryItemInDto = Pick<
  CreateInventoryItemInDtoWithClinicContext,
  Exclude<keyof CreateInventoryItemInDtoWithClinicContext, 'targetClinicId'>
>;
