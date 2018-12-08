import { AuthenticationModule } from './sub-features/authentication/authentication.module';
import { ClinicsModule } from './sub-features/clinics/clinics.module';
import { EmployeesModule } from './sub-features/employees/employees.module';
import { IsIdOfExistingDbEntity } from './validators/is-id-of-existing-db-entity.validator';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantsModule } from './sub-features/tenants/tenants.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
    }),
    EmployeesModule,
    AuthenticationModule,
    ClinicsModule,
    TenantsModule,
  ],
  providers: [IsIdOfExistingDbEntity],
})
export class AppModule {}
