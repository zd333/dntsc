import { ClinicsModule } from '../clinics/clinics.module';
import { forwardRef, Module } from '@nestjs/common';
import { IsIdOfExistingDbEntityValidator } from './validators/is-id-of-existing-db-entity.validator';
import { IsNotExpiredJwtTokenValidator } from './validators/is-not-expired-jwt-token.validator';
import { JwtModule } from '@nestjs/jwt';
import { RequesterIsEmployeeOfTargetClinicGuard } from './guards/requester-is-employee-of-target-clinic.guard';
import { RequestIsInClinicContextGuard } from './guards/request-is-in-clinic-context.guard';
import { TenantFeaturesGuard } from './guards/tenant-features.guard';
import { TenantsModule } from '../tenants/tenants.module';

const validators = [
  IsIdOfExistingDbEntityValidator,
  IsNotExpiredJwtTokenValidator,
];

const guards = [
  RequesterIsEmployeeOfTargetClinicGuard,
  RequestIsInClinicContextGuard,
  TenantFeaturesGuard,
];

/**
 * Contains shared stuff which is used across multiple app modules.
 * !Note circular dependencies!
 * !Import `SharedModule` to modules with circular dependencies using `forwardRef`!
 */
@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: {
        // This is used for auth token, makes it expire earlier
        // Refresh token will have full `sessionExpirationTimeout`
        // So that client can use it after auth token is expired
        // In summary, session will least forever for active clients
        // But `sessionExpirationTimeout` for inactive ones
        expiresIn: Math.round(
          Number(process.env.USER_SESSION_EXPIRATION_IN_SECONDS) * 0.8,
        ),
      },
    }),
    forwardRef(() => TenantsModule),
    forwardRef(() => ClinicsModule),
  ],
  providers: [...guards, ...validators],
  exports: [...guards, ...validators],
})
export class SharedModule {}
