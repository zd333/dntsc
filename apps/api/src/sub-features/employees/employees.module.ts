import { EmployeesController } from './controllers/employees.controller';
import { EmployeesDbConnectorService } from './services/employees-db-connector.service';
import { IsUniqueEmployeeNameForGivenClinics } from './validators/is-unique-employee-name-for-given-clinics.validator';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EMPLOYEE_SCHEMA_NAME,
  EmployeeSchema,
} from './db-schemas/employee.db-schema';

const schemasMap = [
  {
    name: EMPLOYEE_SCHEMA_NAME,
    schema: EmployeeSchema,
  },
];

@Module({
  imports: [MongooseModule.forFeature(schemasMap)],
  providers: [EmployeesDbConnectorService, IsUniqueEmployeeNameForGivenClinics],
  controllers: [EmployeesController],
})
export class EmployeesModule {}
