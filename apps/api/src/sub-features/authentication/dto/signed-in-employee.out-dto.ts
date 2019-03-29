import { AppAccessRoles } from '../../../app-access-roles';
import { Expose } from 'class-transformer';

export class SignedInEmployeeOutDto {
  @Expose()
  public readonly authToken: string;

  @Expose()
  public readonly hasToChangePassword?: boolean;

  @Expose()
  public readonly roles: Array<AppAccessRoles>;

  @Expose()
  public readonly name: string;
}
