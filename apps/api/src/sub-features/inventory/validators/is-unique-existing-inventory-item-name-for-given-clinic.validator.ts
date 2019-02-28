import { Injectable } from '@nestjs/common';
import { InventoryDbConnectorService } from '../services/inventory-db-connector.service';
import { UpdateInventoryItemInDtoWithClinicContext } from '../dto/update-inventory-item.in-dto';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({
  name: 'isUniqueExistingInventoryItemNameForGivenClinics',
  async: true,
})
@Injectable()
/**
 * Almost same as `IsUniqueInventoryItemNameForGivenClinic`,
 * but for existing inventory items which are being updated.
 */
export class IsUniqueExistingInventoryItemNameForGivenClinic
  implements ValidatorConstraintInterface {
  constructor(
    private readonly inventoryDbConnector: InventoryDbConnectorService,
  ) {}

  public async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const dtoObject = validationArguments.object as UpdateInventoryItemInDtoWithClinicContext;
    const { targetClinicId } = dtoObject;
    const nameIsOccupied = await this.inventoryDbConnector.checkInventoryItemWithGivenNameExistsInClinic(
      {
        inventoryItemName: value,
        clinics: [targetClinicId],
        idToExclude: dtoObject.id,
      },
    );

    return !nameIsOccupied;
  }

  public defaultMessage(): string {
    return '$property must be unique for given clinic';
  }
}
