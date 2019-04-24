import { EmployeesDbConnectorService } from '../services/employees-db-connector.service';
import { Injectable } from '@nestjs/common';
import { RegisterEmployeeInDtoWithClinicContext } from '../dto/register-employee.in-dto';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'isNotUsedEmployeeRegistrationToken',
  async: true,
})
@Injectable()
export class IsNotUsedEmployeeRegistrationToken
  implements ValidatorConstraintInterface {
  constructor(
    private readonly employeesDbConnector: EmployeesDbConnectorService,
  ) {}

  public async validate(value: string): Promise<boolean> {
    const employeeWithThisTokenExists = await this.employeesDbConnector.checkEmployeeWithGivenPropertyValueExists(
      {
        employeePropertyName: 'registrationToken',
        employeePropertyValue: value,
      },
    );

    return !employeeWithThisTokenExists;
  }

  public defaultMessage(): string {
    return '$property is already used';
  }
}
