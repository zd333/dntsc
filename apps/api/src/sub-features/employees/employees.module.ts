import { EmployeesDbConnectorService } from './services/employees-db-connector.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EMPLOYEE_SCHEMA_NAME,
  EmployeeSchema,
} from './db-entities/employee.db-entity';

const schemasMap = [
  {
    name: EMPLOYEE_SCHEMA_NAME,
    schema: EmployeeSchema,
  },
];

@Module({
  providers: [EmployeesDbConnectorService],
  imports: [MongooseModule.forFeature(schemasMap)],
})
export class EmployeesModule {}
