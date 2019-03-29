import { AppRequest } from '../../../../src/app.module';
import { ClinicsDbConnectorService } from '../../../../src/sub-features/clinics/services/clinics-db-connector.service';
import { PlatformFeatures } from '../../../../src/sub-features/tenants/db-schemas/tenant.db-schema';
import { Reflector } from '@nestjs/core';
import { TenantsDbConnectorService } from '../../../../src/sub-features/tenants/services/tenants-db-connector.service';
import {
  ReflectMetadata,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';

const REFLECTOR_KEY = 'features';

/**
 * Guard to restrict access to particular platform functionality on tenant level.
 * Use this with `IsRelatedToFeatures` decorator.
 */
@Injectable()
export class TenantFeaturesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly clinicsDbConnector: ClinicsDbConnectorService,
    private readonly tenantsDbConnector: TenantsDbConnectorService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const controllerClassFeatures = this.reflector.get<Array<PlatformFeatures>>(
      REFLECTOR_KEY,
      context.getClass(),
    );
    const controllerMethodFeatures = this.reflector.get<
      Array<PlatformFeatures>
    >(REFLECTOR_KEY, context.getHandler());
    const features = [
      ...(Array.isArray(controllerClassFeatures)
        ? controllerClassFeatures
        : []),
      ...(Array.isArray(controllerMethodFeatures)
        ? controllerMethodFeatures
        : []),
    ];
    if (!features.length) {
      // No feature requirements for target controller
      return true;
    }

    const req: AppRequest = context.switchToHttp().getRequest();
    const { targetClinicId } = req;
    if (!targetClinicId) {
      // Request is not in clinic context (is with unsupported host)
      return false;
    }

    const clinic = await this.clinicsDbConnector.getById(targetClinicId);
    if (!clinic) {
      // Clinic not exists (shouldn't happen because targetClinicId is added by app internally
      // And expected to be id of existing clinic, but anyway)
      return false;
    }

    const tenantId = clinic.tenant;
    const tenant = await this.tenantsDbConnector.getById(tenantId);

    if (!tenant || !Array.isArray(tenant.features)) {
      return false;
    }

    const tenantFeatures = tenant.features;

    return features.every(requiredFeature =>
      tenantFeatures.some(feature => feature === requiredFeature),
    );
  }
}

/**
 * Decorator to be used with controllers.
 * Defines features that controller is related to.
 * Use this with `TenantFeaturesGuard` to restrict access to particular platform functionality
 * on tenant level.
 */
export const IsRelatedToFeatures = (...features: Array<PlatformFeatures>) =>
  ReflectMetadata(REFLECTOR_KEY, features);
