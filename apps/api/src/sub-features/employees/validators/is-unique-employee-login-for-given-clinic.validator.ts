import { CreateEmployeeInDto } from '../dto/create-employee.in-dto';
import { EmployeesDbConnectorService } from '../services/employees-db-connector.service';
import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({
  name: 'isUniqueEmployeeLoginForGivenClinics',
  async: true,
})
@Injectable()
export class IsUniqueEmployeeLoginForGivenClinic
  implements ValidatorConstraintInterface {
  constructor(
    private readonly employeesDbConnector: EmployeesDbConnectorService,
  ) {}

  public async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const dtoObject = validationArguments.object as CreateEmployeeInDto;
    const { targetClinicId } = dtoObject;
    const nameIsOccupied = await this.employeesDbConnector.checkEmployeeWithGivenPropertyValueExistsInSomeOfTheClinicsList(
      {
        clinics: [targetClinicId],
        employeePropertyName: 'login',
        employeePropertyValue: value,
      },
    );

    return !nameIsOccupied;
  }

  defaultMessage() {
    return '$property must be unique for given clinic';
  }
}
