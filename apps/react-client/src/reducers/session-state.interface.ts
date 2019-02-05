import { AppAccessRoles } from '@api/app-access-roles';
import { PlatformFeatures } from '@api/sub-features/tenants/db-schemas/tenant.db-schema';

export interface SessionState {
  readonly authToken: string | undefined;
  readonly userRoles: Array<AppAccessRoles>;
  readonly userName: string | undefined;
  readonly authApiCommunicationIsInProgress: boolean;
  readonly currentLanguage: 'en' | 'ru' | 'ua';
  readonly availableFeatures: Array<PlatformFeatures>;
}
