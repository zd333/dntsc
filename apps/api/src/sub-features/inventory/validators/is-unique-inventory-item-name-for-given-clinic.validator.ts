import { CreateInventoryItemInDtoWithClinicContext } from '../dto/create-inventory-item.dto';
import { Injectable } from '@nestjs/common';
import { InventoryDbConnectorService } from '../services/inventory-db-connector.service';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({
  name: 'isUniqueInventoryItemNameForGivenClinics',
  async: true,
})
@Injectable()
export class IsUniqueInventoryItemNameForGivenClinic
  implements ValidatorConstraintInterface {
  constructor(
    private readonly inventoryDbConnector: InventoryDbConnectorService,
  ) {}

  public async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const dtoObject = validationArguments.object as CreateInventoryItemInDtoWithClinicContext;
    const { targetClinicId } = dtoObject;
    const nameIsOccupied = await this.inventoryDbConnector.checkInventoryItemWithGivenNameExistsInClinic(
      {
        inventoryItemName: value,
        clinics: [targetClinicId],
      },
    );

    return !nameIsOccupied;
  }

  defaultMessage() {
    return '$property must be unique for given clinic';
  }
}
