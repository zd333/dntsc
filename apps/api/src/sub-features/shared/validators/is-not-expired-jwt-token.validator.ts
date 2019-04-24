import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenWithPayload } from '../types/jwt-token-with-payload';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({
  name: 'isNotExpiredJwtTokenValidator',
})
@Injectable()
export class IsNotExpiredJwtTokenValidator
  implements ValidatorConstraintInterface {
  constructor(private readonly jwt: JwtService) {}

  public validate(
    // This is really any
    /* tslint:disable:no-any */
    value: JwtTokenWithPayload<any>,
  ): boolean {
    try {
      this.jwt.verify(value);

      // If no error thrown - then token is valid and not expired
      return true;
    } catch (e) {
      return false;
    }
  }

  public defaultMessage(): string {
    return '$token must be valid and not expired';
  }
}
