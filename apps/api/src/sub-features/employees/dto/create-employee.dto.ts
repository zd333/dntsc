import { Employee } from '../models/employee.model';

// TODO: add missing fields (acls, specialities ..)
export class CreateEmployeeDto {
  readonly login: Employee['login'];
  readonly password: Employee['password'];
  readonly name: Employee['name'];
  readonly clinics: Employee['clinics'];
}
