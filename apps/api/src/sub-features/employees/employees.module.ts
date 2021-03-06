import { EmployeesController } from './controllers/employees.controller';
import { EmployeesDbConnectorService } from './services/employees-db-connector.service';
import { IsNotUsedEmployeeRegistrationToken } from './validators/is-not-used-employee-registration-token.validator';
import { IsUniqueEmployeeLoginForGivenClinic } from './validators/is-unique-employee-login-for-given-clinic.validator';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { RequesterIsPlatformOwnerIfProcessesClinicOwnerGuard } from './guards/requester-is-platform-owner-if-processes-clinic-owner.guard';
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
    RequesterIsPlatformOwnerIfProcessesClinicOwnerGuard,
    EmployeesDbConnectorService,
    IsUniqueEmployeeLoginForGivenClinic,
    IsNotUsedEmployeeRegistrationToken,
  ],
  controllers: [EmployeesController],
  exports: [EmployeesDbConnectorService],
})
export class EmployeesModule {}
