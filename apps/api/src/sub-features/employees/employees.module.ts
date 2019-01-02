import { EmployeesController } from './controllers/employees.controller';
import { EmployeesDbConnectorService } from './services/employees-db-connector.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewEmployeeLoginIsUniqueForClinics } from './validators/new-employee-login-is-unique-for-clinics.validator';
import { PassportModule } from '@nestjs/passport';
import { RequesterIsPlatformOwnerIfCreatesClinicOwnerGuard } from './guards/requester-is-platform-owner-if-creates-clinic-owner.guard';
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
    RequesterIsPlatformOwnerIfCreatesClinicOwnerGuard,
    EmployeesDbConnectorService,
    NewEmployeeLoginIsUniqueForClinics,
  ],
  controllers: [EmployeesController],
  exports: [EmployeesDbConnectorService],
})
export class EmployeesModule {}
