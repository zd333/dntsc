import { AuthenticationService } from '../services/authentication.service';
import { Body, Controller, Post } from '@nestjs/common';
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
  public async signInEmployee(
    @Body() dto: SignInEmployeeInDto,
  ): Promise<SignedInEmployeeOutDto> {
    return await this.authenticationService.signInEmployee(dto);
  }
}
