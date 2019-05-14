import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreatedClinicOutDto {
  @Expose()
  @ApiModelProperty()
  public readonly id: string;
}
