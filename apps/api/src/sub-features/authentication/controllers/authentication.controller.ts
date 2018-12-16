import { AppRequest } from 'src/app.module';
import { AuthenticationService } from '../services/authentication.service';
import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards
  } from '@nestjs/common';
import { IsInClinicContext } from 'src/sub-features/shared/guards/is-in-clinic-context.guard';
import { SignedInEmployeeOutDto } from '../dto/signed-in-employee.out-dto';
import { SignInEmployeeInDto } from '../dto/sign-in-employee.in-dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  /**
   * Endpoint to sign in employee with login and password.
   * TODO: do not allow logged in user login again.
   */
  @Post('sign-in-employee')
  @UseGuards(IsInClinicContext)
  public async signInEmployee(
    @Body() dto: SignInEmployeeInDto,
    @Request() req: AppRequest,
  ): Promise<SignedInEmployeeOutDto> {
    const { clinicId } = req;

    return await this.authenticationService.signInEmployee(dto, clinicId);
  }
}
