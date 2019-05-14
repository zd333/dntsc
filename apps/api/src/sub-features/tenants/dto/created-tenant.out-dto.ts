import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatedTenantOutDto {
  @Expose()
  @ApiModelProperty()
  public readonly id: string;
}
