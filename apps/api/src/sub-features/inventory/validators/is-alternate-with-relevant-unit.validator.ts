import { CreateInventoryItemInDto } from '../dto/create-inventory-item.dto';
import { Injectable } from '@nestjs/common';
import { InventoryDbConnectorService } from '../services/inventory-db-connector.service';
import { inventoryItemHasPcsUnit } from '../helpers/inventory-item-has-pcs-unit';
import { inventoryItemsHaveRelevantUnits } from '../helpers/inventory-items-have-relevant-units';
import { InventoryItemUnits } from '../db-schemas/inventory-item.db-schema';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// TODO: test
@ValidatorConstraint({
  name: 'isAlternateWithRelevantUnit',
  async: true,
})
@Injectable()
export class IsAlternateWithRelevantUnit
  implements ValidatorConstraintInterface {
  constructor(
    private readonly inventoryDbConnector: InventoryDbConnectorService,
  ) {}

  public async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const dtoObject = validationArguments.object as CreateInventoryItemInDto;
    const alternateInventoryItem = await this.inventoryDbConnector.getItemById(
      value,
    );
    if (!dtoObject || !dtoObject.unit || !alternateInventoryItem) {
      // Somebody else has to take care of this
      return true;
    }

    return inventoryItemsHaveRelevantUnits(dtoObject, alternateInventoryItem);
  }

  defaultMessage() {
    return '$property must be inventory items with relevant units';
  }
}
