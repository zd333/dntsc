import { AuthenticatedUser } from './sub-features/authentication/services/authentication.service';
import { AuthenticationModule } from './sub-features/authentication/authentication.module';
import { ClinicsModule } from './sub-features/clinics/clinics.module';
import { DetermineClinicByHostNameMiddleware } from './middlewares/determine-clinic-by-host-name.middleware';
import { EmployeesModule } from './sub-features/employees/employees.module';
import { IsIdOfExistingDbEntityValidator } from './validators/is-id-of-existing-db-entity.validator';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Request } from 'express';
import { TenantsModule } from './sub-features/tenants/tenants.module';
import { Types } from 'mongoose';

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
  providers: [
    IsIdOfExistingDbEntityValidator,
    DetermineClinicByHostNameMiddleware,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DetermineClinicByHostNameMiddleware).forRoutes({
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
   * Id of clinic, depends on request host name. See `DetermineClinicByHostNameMiddleware`.
   */
  clinicId?: Types.ObjectId;
};
