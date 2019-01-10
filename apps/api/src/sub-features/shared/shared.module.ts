import { ClinicsModule } from '../clinics/clinics.module';
import { forwardRef, Module } from '@nestjs/common';
import { IsIdOfExistingDbEntityValidator } from './validators/is-id-of-existing-db-entity.validator';
import { RequesterIsEmployeeOfTargetClinicGuard } from './guards/requester-is-employee-of-target-clinic.guard';
import { RequestIsInClinicContextGuard } from './guards/request-is-in-clinic-context.guard';
import { TenantFeaturesGuard } from './guards/tenant-features.guard';
import { TenantsModule } from '../tenants/tenants.module';

const validators = [IsIdOfExistingDbEntityValidator];

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
  imports: [forwardRef(() => TenantsModule), forwardRef(() => ClinicsModule)],
  providers: [...guards, ...validators],
  exports: [...guards, ...validators],
})
export class SharedModule {}
