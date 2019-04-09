import { AppRequest } from '../../../../src/app.module';
import { AuthenticationService } from '../services/authentication.service';
import { AuthGuard } from '@nestjs/passport';
import { RefreshAuthInDtoWithClinicContext } from '../dto/refresh-auth.in-dto';
import { RequesterIsEmployeeOfTargetClinicGuard } from '../../shared/guards/requester-is-employee-of-target-clinic.guard';
import { RequestIsInClinicContextGuard } from '../../../../src/sub-features/shared/guards/request-is-in-clinic-context.guard';
import { SignedInEmployeeOutDto } from '../dto/signed-in-employee.out-dto';
import { SignInEmployeeInDtoWithClinicContext } from '../dto/sign-in-employee.in-dto';
import { SignInPlatformOwnerInDto } from '../dto/sign-in-platform-owner.in-dto';
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  /**
   * Endpoint to sign in employee with login and password.
   */
  @Post('sign-in-employee')
  @UseGuards(RequestIsInClinicContextGuard)
  public async signInEmployee(
    @Body() dto: SignInEmployeeInDtoWithClinicContext,
    @Request() req: AppRequest,
  ): Promise<SignedInEmployeeOutDto> {
    if (req.user) {
      // Do not allow user sign-in twice (he must sign out first)
      throw new ForbiddenException();
    }

    return await this.authenticationService.signInEmployee(dto);
  }

  /**
   * Endpoint to sign in employee with login and password.
   */
  @Post('sign-in-platform-owner')
  public async signInPlatformOwner(
    @Body() dto: SignInPlatformOwnerInDto,
  ): Promise<SignedInEmployeeOutDto> {
    return await this.authenticationService.signInPlatformOwner(dto);
  }

  /**
   * Returns new fresh auth token.
   * Checks refresh token which lives longer than regular auth token.
   * Is implemented for regular employee (not for platform owners).
   */
  @UseGuards(RequestIsInClinicContextGuard)
  @Post('refresh-employee-session')
  public async refreshAuth(
    @Body() dto: RefreshAuthInDtoWithClinicContext,
  ): Promise<SignedInEmployeeOutDto> {
    return await this.authenticationService.refreshEmployeeAuthToken(dto);
  }
}
