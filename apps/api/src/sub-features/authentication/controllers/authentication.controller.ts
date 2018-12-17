import { AppRequest } from 'src/app.module';
import { AuthenticationService } from '../services/authentication.service';
import { IsInClinicContextGuard } from 'src/sub-features/shared/guards/is-in-clinic-context.guard';
import { SignedInEmployeeOutDto } from '../dto/signed-in-employee.out-dto';
import { SignInEmployeeInDto } from '../dto/sign-in-employee.in-dto';
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
  @UseGuards(IsInClinicContextGuard)
  public async signInEmployee(
    @Body() dto: SignInEmployeeInDto,
    @Request() req: AppRequest,
  ): Promise<SignedInEmployeeOutDto> {
    if (req.user) {
      // Do not allow user sign-in twice (he must sign out first)
      throw new ForbiddenException();
    }

    const { clinicId } = req;

    return await this.authenticationService.signInEmployee(dto, clinicId);
  }

  /**
   * Endpoint to sign in employee with login and password.
   */
  @Post('sign-in-platform-owner')
  public async signInPlatformOwner(
    @Body() dto: SignInEmployeeInDto,
  ): Promise<SignedInEmployeeOutDto> {
    return await this.authenticationService.signInPlatformOwner(dto);
  }
}
