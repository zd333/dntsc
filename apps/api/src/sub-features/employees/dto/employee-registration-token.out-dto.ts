import { ApiModelProperty } from '@nestjs/swagger';
import { CreateEmployeeRegistrationTokenInDto } from './create-employee-registration-token.in-dto';
import { Expose } from 'class-transformer';
import { JwtTokenWithPayload } from '../../shared/types/jwt-token-with-payload';

export class EmployeeRegistrationTokenOutDto {
  @Expose()
  @ApiModelProperty()
  public readonly registrationToken: JwtTokenWithPayload<
    CreateEmployeeRegistrationTokenInDto
  >;
}
