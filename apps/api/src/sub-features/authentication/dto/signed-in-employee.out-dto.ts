import { AppAccessRoles } from '../../../app-access-roles';
import { Expose } from 'class-transformer';

export class SignedInEmployeeOutDto {
  @Expose()
  public readonly authToken: string;

  @Expose()
  /**
   * Contains `JwtPayload` payload, see `AuthenticationService`.
   */
  public readonly refreshToken: string;

  @Expose()
  public readonly roles: Array<AppAccessRoles>;

  @Expose()
  public readonly name: string;
}
