import { EmployeesController } from './controllers/employees.controller';
import { EmployeesDbConnectorService } from './services/employees-db-connector.service';
import { IsUniqueEmployeeLoginForGivenClinics } from './validators/is-unique-employee-login-for-given-clinics.validator';
import { IsUniqueEmployeeNameForGivenClinics } from './validators/is-unique-employee-name-for-given-clinics.validator';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import {
  EMPLOYEE_SCHEMA_COLLECTION_NAME,
  EmployeeSchema,
} from './db-schemas/employee.db-schema';

const schemasMap = [
  {
    name: EMPLOYEE_SCHEMA_COLLECTION_NAME,
    collection: EMPLOYEE_SCHEMA_COLLECTION_NAME,
    schema: EmployeeSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(schemasMap),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    EmployeesDbConnectorService,
    IsUniqueEmployeeNameForGivenClinics,
    IsUniqueEmployeeLoginForGivenClinics,
  ],
  controllers: [EmployeesController],
  exports: [EmployeesDbConnectorService],
})
export class EmployeesModule {}
