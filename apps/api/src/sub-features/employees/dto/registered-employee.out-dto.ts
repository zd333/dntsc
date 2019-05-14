import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RegisteredEmployeeOutDto {
  @Expose()
  @ApiModelProperty()
  public readonly id: string;
}
