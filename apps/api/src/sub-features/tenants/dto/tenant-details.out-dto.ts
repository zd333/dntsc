import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  PlatformFeatures,
  allPlatformFeatures,
} from '../db-schemas/tenant.db-schema';

export class TenantDetailsOutDto {
  @Expose()
  @ApiModelProperty()
  public readonly id: string;

  @Expose()
  @ApiModelProperty()
  public readonly name: string;

  @Expose()
  @ApiModelProperty({
    isArray: true,
    enum: allPlatformFeatures,
  })
  public readonly features: Array<PlatformFeatures>;
}
