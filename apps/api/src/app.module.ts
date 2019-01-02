import { AccessControlModule } from 'nest-access-control';
import { AddClinicContextMiddleware } from './middlewares/add-clinic-context.middleware';
import { appRoles } from './app-access-roles';
import { AuthenticatedUser } from './sub-features/authentication/services/authentication.service';
import { AuthenticationModule } from './sub-features/authentication/authentication.module';
import { ClinicsModule } from './sub-features/clinics/clinics.module';
import { EmployeesModule } from './sub-features/employees/employees.module';
import { InventoryModule } from './sub-features/inventory/inventory.module';
import { IsIdOfExistingDbEntityValidator } from './sub-features/shared/validators/is-id-of-existing-db-entity.validator';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Request } from 'express';
import { TenantsModule } from './sub-features/tenants/tenants.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
    }),
    AccessControlModule.forRoles(appRoles),
    EmployeesModule,
    AuthenticationModule,
    ClinicsModule,
    TenantsModule,
    InventoryModule,
  ],
  providers: [IsIdOfExistingDbEntityValidator, AddClinicContextMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddClinicContextMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

/**
 * Request object + additional app-specific properties.
 */
export type AppRequest = Request & {
  /**
   * User that performs request (if request is authenticated).
   */
  user?: AuthenticatedUser;
  /**
   * Id of clinic, depends on request host name. See `AddClinicContextMiddleware`.
   */
  targetClinicId?: string;
};
