import { AppRequest } from '../../../../src/app.module';
import { AuthenticationService } from '../services/authentication.service';
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
}
