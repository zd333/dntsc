import { EMPLOYEE_SCHEMA_NAME, EmployeeSchema } from './models/employee.model';
import { EmployeesService } from './services/employees.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

const schemasMap = [
  {
    name: EMPLOYEE_SCHEMA_NAME,
    schema: EmployeeSchema,
  },
];

@Module({
  providers: [EmployeesService],
  imports: [MongooseModule.forFeature(schemasMap)],
})
export class EmployeesModule {}
