import { EmployeesController } from './controllers/employees.controller';
import { EmployeesDbConnectorService } from './services/employees-db-connector.service';
import { IsUniqueEmployeeLoginForGivenClinic } from './validators/is-unique-employee-login-for-given-clinic.validator';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { RequesterIsPlatformOwnerIfCreatesClinicOwnerGuard } from './guards/requester-is-platform-owner-if-creates-clinic-owner.guard';
import { SharedModule } from '../shared/shared.module';
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
    SharedModule,
  ],
  providers: [
    RequesterIsPlatformOwnerIfCreatesClinicOwnerGuard,
    EmployeesDbConnectorService,
    IsUniqueEmployeeLoginForGivenClinic,
  ],
  controllers: [EmployeesController],
  exports: [EmployeesDbConnectorService],
})
export class EmployeesModule {}
