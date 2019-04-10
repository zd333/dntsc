import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  AuthenticationService,
  JwtAuthTokenPayload,
  AuthenticatedUser,
} from './authentication.service';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * Passport uses this method validate user and add it to request object.
   */
  public async validate(
    payload: JwtAuthTokenPayload,
  ): Promise<AuthenticatedUser> {
    const user = await this.authenticationService.validateUserByJwtPayload(
      payload,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
