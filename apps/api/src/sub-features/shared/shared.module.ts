import { ClinicsModule } from '../clinics/clinics.module';
import { forwardRef, Module } from '@nestjs/common';
import { RequesterIsEmployeeOfTargetClinicGuard } from './guards/requester-is-employee-of-target-clinic.guard';
import { RequestIsInClinicContextGuard } from './guards/request-is-in-clinic-context.guard';
import { TenantFeaturesGuard } from './guards/tenant-features.guard';
import { TenantsModule } from '../tenants/tenants.module';

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
  providers: [...guards],
  exports: [...guards],
})
export class SharedModule {}
