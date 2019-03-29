import { AccessControlModule } from 'nest-access-control';
import { AddClinicContextMiddleware } from './middlewares/add-clinic-context.middleware';
import { appRoles } from './app-access-roles';
import { AuthenticatedUser } from './sub-features/authentication/services/authentication.service';
import { AuthenticationModule } from './sub-features/authentication/authentication.module';
import { ClinicsModule } from './sub-features/clinics/clinics.module';
import { EmployeesModule } from './sub-features/employees/employees.module';
import { InventoryModule } from './sub-features/inventory/inventory.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Request } from 'express';
import { TenantsModule } from './sub-features/tenants/tenants.module';

const mongoConnStr = process.env.MONGO_CONNECTION_STRING || '';

@Module({
  imports: [
    MongooseModule.forRoot(mongoConnStr, {
      useNewUrlParser: true,
    }),
    AccessControlModule.forRoles(appRoles),
    EmployeesModule,
    AuthenticationModule,
    ClinicsModule,
    TenantsModule,
    InventoryModule,
  ],
  providers: [AddClinicContextMiddleware],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AddClinicContextMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}

/**
 * Request object + additional app-specific properties.
 * Do not use original Express typing of request object due to it is not strict.
 * Add only those fields which are used in the app (add more as we go).
 */
export type AppRequest = Pick<Request, 'header' | 'body'> & {
  /**
   * User that performs request (if request is authenticated).
   */
  // Must be mutable because is assigned by custom middleware
  /* tslint:disable-next-line:readonly-keyword */
  user: AuthenticatedUser;
  /**
   * Id of clinic, depends on request host name. See `AddClinicContextMiddleware`.
   */
  // Must be mutable because is assigned by custom middleware
  /* tslint:disable-next-line:readonly-keyword */
  targetClinicId?: string;
};
