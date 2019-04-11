import { CreateEmployeeRegistrationTokenInDto } from './create-employee-registration-token.in-dto';
import { Expose } from 'class-transformer';
import { JwtTokenWithPayload } from '../../shared/types/jwt-token-with-payload';

export class EmployeeRegistrationTokenOutDto {
  @Expose()
  public readonly registrationToken: JwtTokenWithPayload<
    CreateEmployeeRegistrationTokenInDto
  >;

  /**
   * ISO date/time string that defines moment when registration token expires.
   * Same (almost) encoded value sits in `registrationToken` JWT token signature.
   * This is duplicated raw (not encoded) value for client (so that client can use it
   * to determine if `registrationToken` is expired).
   */
  @Expose()
  public readonly expiration: IsoDateTimeString;
}

export type IsoDateTimeString = string;
