import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { IsString, MinLength } from 'class-validator';

export class RefreshAuthInDtoWithClinicContext extends InDtoWithClinicContext {
  @IsString()
  /**
   * Contains `JwtPayload` payload, see `AuthenticationService` and `SignedInEmployeeOutDto`.
   */
  public readonly refreshToken: string;
}

/**
 * DTO type for clients.
 */
export type RefreshAuthInDto = Pick<
  RefreshAuthInDtoWithClinicContext,
  Exclude<keyof RefreshAuthInDtoWithClinicContext, 'targetClinicId'>
>;
