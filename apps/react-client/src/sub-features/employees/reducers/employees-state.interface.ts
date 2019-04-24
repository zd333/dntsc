import { EmployeeDetailsOutDto } from '@api/sub-features/employees/dto/employee-details.out-dto';

export interface EmployeesState {
  readonly employeesDict: {
    readonly [id: string]: EmployeeDetailsOutDto;
  };
  readonly fetchEmployeesApiRequestInProgress: boolean;
  readonly saveEmployeeUpdatesApiRequestInProgress: boolean;

  readonly createEmployeeRegistrationTokenInProgress: boolean;
  readonly createdRegistrationToken: string;
}
