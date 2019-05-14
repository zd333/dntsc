import { ApiResponse } from '@nestjs/swagger';
import { AppRequest } from '../../../app.module';
import { AuthenticationService } from '../services/authentication.service';
import { RefreshAuthInDtoWithClinicContext } from '../dto/refresh-auth.in-dto';
import { RequestIsInClinicContextGuard } from '../../../sub-features/shared/guards/request-is-in-clinic-context.guard';
import { SignedInEmployeeOutDto } from '../dto/signed-in-employee.out-dto';
import { SignInEmployeeInDtoWithClinicContext } from '../dto/sign-in-employee.in-dto';
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiResponse({
    description: 'Endpoint to sign in employee with login and password.',
    status: HttpStatus.CREATED,
    type: SignedInEmployeeOutDto,
  })
  @Post('sign-in-employee')
  public async signInEmployee(
    /**
     * DTO can also be `SignInPlatformOwnerInDto`.
     * Do not specify type union because Swagger will not understand :(
     */
    @Body()
    dto: SignInEmployeeInDtoWithClinicContext,
    @Request() req: AppRequest,
  ): Promise<SignedInEmployeeOutDto> {
    if (req.user) {
      // Do not allow user sign-in twice (he must sign out first)
      throw new ForbiddenException();
    }

    return await this.authenticationService.signInEmployee(dto);
  }

  @ApiResponse({
    description: `
      Returns new fresh auth token.
      Checks refresh token which lives longer than regular auth token.
      Checks refresh token which lives longer than regular auth token.
    `,
    type: SignedInEmployeeOutDto,
    status: HttpStatus.CREATED,
  })
  @UseGuards(RequestIsInClinicContextGuard)
  @Post('refresh-employee-session')
  public async refreshAuth(
    @Body() dto: RefreshAuthInDtoWithClinicContext,
  ): Promise<SignedInEmployeeOutDto> {
    return await this.authenticationService.refreshEmployeeAuthToken(dto);
  }
}
