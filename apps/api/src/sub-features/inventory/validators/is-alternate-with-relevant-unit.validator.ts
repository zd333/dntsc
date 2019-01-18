import { CreateInventoryItemInDtoWithClinicContext } from '../dto/create-inventory-item.dto';
import { Injectable } from '@nestjs/common';
import { InventoryDbConnectorService } from '../services/inventory-db-connector.service';
import { inventoryItemsHaveRelevantUnits } from '../helpers/inventory-items-have-relevant-units';
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
    const dtoObject = validationArguments.object as CreateInventoryItemInDtoWithClinicContext;
    const alternateInventoryItem = await this.inventoryDbConnector.getItemById(
      value,
    );
    if (!dtoObject || !dtoObject.unit || !alternateInventoryItem) {
      // Somebody else has to take care of this
      return true;
    }

    return inventoryItemsHaveRelevantUnits(dtoObject, alternateInventoryItem);
  }

  public defaultMessage(): string {
    return '$property must be inventory items with relevant units';
  }
}
