import { Injectable } from '@nestjs/common';
import { TenantsDbConnectorService } from '../services/tenants-db-connector.service';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isUniqueTenantName', async: true })
@Injectable()
export class IsUniqueTenantNameValidator
  implements ValidatorConstraintInterface {
  constructor(private readonly tenantsDbConnector: TenantsDbConnectorService) {}

  public async validate(name: string): Promise<boolean> {
    const nameIsOccupied = await this.tenantsDbConnector.checkTenantWithGivenNameExists(
      name,
    );

    return !nameIsOccupied;
  }

  defaultMessage() {
    return '$property must be unique, $value is already existing tenant';
  }
}
