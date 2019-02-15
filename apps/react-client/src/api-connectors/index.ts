import { getTenantOfCurrentClinicApiConnector } from './get-tenant-of-current-clinic.api-connector';
import { signInApiConnector } from './sign-in.api-connector';

/**
 * This should have structure that follows epic middleware dependency injection interface.
 * See `createEpicMiddleware`.
 */
export const rootApiConnectors = {
  signInApiConnector,
  getTenantOfCurrentClinicApiConnector,
};
