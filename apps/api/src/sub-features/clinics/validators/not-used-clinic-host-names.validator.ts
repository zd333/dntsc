import { ClinicsDbConnectorService } from '../services/clinics-db-connector.service';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Checks all hosts from the passed array are not used (saved) in any of existing clinic.
 */
@ValidatorConstraint({ name: 'notUsedClinicHostNames', async: true })
@Injectable()
export class NotUsedClinicHostNames implements ValidatorConstraintInterface {
  constructor(
    private readonly clinicsDbConnectorService: ClinicsDbConnectorService,
  ) {}

  public async validate(value: Array<string>): Promise<boolean> {
    const someHostNamesAreAlreadyUsed = await this.clinicsDbConnectorService.checkHostNamesAreUsedInSomeClinics(
      value,
    );

    return !someHostNamesAreAlreadyUsed;
  }

  public defaultMessage(): string {
    return '$property must contain all new (not used by other clinics) host names';
  }
}
