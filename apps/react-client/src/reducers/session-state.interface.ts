import { AppAccessRoles } from '@api/app-access-roles';
import { PlatformFeatures } from '@api/sub-features/tenants/db-schemas/tenant.db-schema';

export interface SessionState {
  readonly authToken: string | undefined;
  readonly userRoles: Array<AppAccessRoles>;
  readonly userName: string | undefined;
  readonly authApiCommunicationIsInProgress: boolean;
  readonly currentLanguage: AppLanguages;
  readonly availableFeatures: Array<PlatformFeatures>;
}

// ! Note, enum values are important and must match intl lib locale values, see `IntlProviderContainer`
export enum AppLanguages {
  en = 'EN',
  ru = 'RU',
  ua = 'UA',
}
