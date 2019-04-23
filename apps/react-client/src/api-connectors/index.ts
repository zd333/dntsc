import { getTenantOfCurrentClinicApiConnector } from './get-tenant-of-current-clinic.api-connector';
import { refreshSessionApiConnector } from './refresh-session.api-connector';
import { registerEmployeeApiConnector } from './register-employee.api-connector';
import { signInApiConnector } from './sign-in.api-connector';

export const rootApiConnectors = {
  signInApiConnector,
  getTenantOfCurrentClinicApiConnector,
  refreshSessionApiConnector,
  registerEmployeeApiConnector,
};
