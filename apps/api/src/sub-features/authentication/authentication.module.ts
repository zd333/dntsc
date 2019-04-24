import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { EmployeesModule } from '../employees/employees.module';
import { JwtPassportStrategy } from './services/jwt-passport-strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EmployeesModule,
    SharedModule,
  ],
  providers: [
    AuthenticationService,
    JwtPassportStrategy,
    {
      provide: 'USER_SESSION_EXPIRATION_IN_SECONDS',
      useValue: process.env.USER_SESSION_EXPIRATION_IN_SECONDS,
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
