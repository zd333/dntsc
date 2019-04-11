import { AppAccessRoles } from '../../../app-access-roles';
import { Expose } from 'class-transformer';
import { JwtAuthTokenPayload } from '../services/authentication.service';
import { JwtTokenWithPayload } from '../../shared/types/jwt-token-with-payload';

export class SignedInEmployeeOutDto {
  /**
   * This token should be added to headers of all requests that require auth.
   */
  @Expose()
  public readonly authToken: JwtTokenWithPayload<JwtAuthTokenPayload>;

  /**
   * This token has same payload as authToken, but longer expiration term.
   * Use this token to refresh session (get new tokens) after `authToken` is expired.
   */
  @Expose()
  public readonly refreshToken: JwtTokenWithPayload<JwtAuthTokenPayload>;

  @Expose()
  public readonly roles: Array<AppAccessRoles>;

  @Expose()
  public readonly name: string;
}
