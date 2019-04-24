import { AppAccessRoles } from '@api/app-access-roles';
import { PlatformFeatures } from '@api/sub-features/tenants/db-schemas/tenant.db-schema';

export interface SessionState {
  // Need explicit flag for saved session, undefined means still unknown
  readonly userIsLoggedIn: boolean | undefined;
  readonly authToken: string | undefined;
  readonly refreshToken: string | undefined;
  readonly userRoles: Array<AppAccessRoles>;
  readonly userName: string | undefined;
  readonly authApiCommunicationIsInProgress: boolean;
  readonly currentLanguage: AppLanguages;
  readonly availableFeatures: Array<PlatformFeatures> | undefined;
  readonly employeeRegistrationTokenIsValid?: boolean;
}

// ! Note, enum values are important and must match intl lib locale values, see `IntlProviderContainer`
export enum AppLanguages {
  en = 'EN',
  ru = 'RU',
  ua = 'UA',
}
