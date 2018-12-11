import { CreateEmployeeInDto } from '../dto/create-employee.in-dto';
import { EmployeesDbConnectorService } from '../services/employees-db-connector.service';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({
  name: 'isUniqueEmployeeNameForGivenClinics',
  async: true,
})
@Injectable()
export class IsUniqueEmployeeNameForGivenClinics
  implements ValidatorConstraintInterface {
  constructor(
    private readonly employeesDbConnector: EmployeesDbConnectorService,
  ) {}

  public async validate(
    employeeName: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const dtoObject = validationArguments.object as CreateEmployeeInDto;
    const { clinics } = dtoObject;
    const nameIsOccupied = await this.employeesDbConnector.checkEmployeeWithGivenNameExistsInSomeOfTheClinicsList(
      { employeeName, clinics },
    );

    return !nameIsOccupied;
  }

  defaultMessage() {
    return '$property must be unique for given clinics';
  }
}
