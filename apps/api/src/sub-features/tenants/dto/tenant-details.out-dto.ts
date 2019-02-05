import { Expose } from 'class-transformer';
import { PlatformFeatures } from '../db-schemas/tenant.db-schema';

export class TenantDetailsOutDto {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly features: Array<PlatformFeatures>;
}
