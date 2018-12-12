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
export class IsUniqueEmployeeLoginForGivenClinics
  implements ValidatorConstraintInterface {
  constructor(
    private readonly employeesDbConnector: EmployeesDbConnectorService,
  ) {}

  public async validate(
    employeeLogin: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const dtoObject = validationArguments.object as CreateEmployeeInDto;
    const { clinics } = dtoObject;
    const nameIsOccupied = await this.employeesDbConnector.checkEmployeeWithGivenPropertyValueExistsInSomeOfTheClinicsList(
      {
        clinics,
        employeePropertyName: 'login',
        employeePropertyValue: employeeLogin,
      },
    );

    return !nameIsOccupied;
  }

  defaultMessage() {
    return '$property must be unique for given clinics';
  }
}
