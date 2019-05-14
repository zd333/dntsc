import { ApiModelProperty } from '@nestjs/swagger';
import { InDtoWithClinicContext } from '../../../middlewares/add-clinic-context.middleware';
import { IsString } from 'class-validator';
import { JwtAuthTokenPayload } from '../services/authentication.service';
import { JwtTokenWithPayload } from '../../shared/types/jwt-token-with-payload';

export class RefreshAuthInDtoWithClinicContext extends InDtoWithClinicContext {
  @IsString()
  @ApiModelProperty()
  public readonly refreshToken: JwtTokenWithPayload<JwtAuthTokenPayload>;
}

/**
 * DTO type for clients.
 */
export type RefreshAuthInDto = Pick<
  RefreshAuthInDtoWithClinicContext,
  Exclude<keyof RefreshAuthInDtoWithClinicContext, 'targetClinicId'>
>;
