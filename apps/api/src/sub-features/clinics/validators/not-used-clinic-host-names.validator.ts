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

  public async validate(hostNames: Array<string>): Promise<boolean> {
    const someHostNamesAreAlreadyUsed = await this.clinicsDbConnectorService.checkHostNamesAreUsedInSomeClinics(
      hostNames,
    );

    return !someHostNamesAreAlreadyUsed;
  }

  defaultMessage() {
    return '$property must contain all new (not used by other clinics) host names';
  }
}
