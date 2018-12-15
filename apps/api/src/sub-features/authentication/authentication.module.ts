import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { EmployeesModule } from '../employees/employees.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtPassportStrategy } from './services/jwt-passport-strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: {
        // TODO: move sign-in expiration to env variable
        expiresIn: 3600,
      },
    }),
    EmployeesModule,
  ],
  providers: [AuthenticationService, JwtPassportStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}

// TODO: check if employee has to change password and add corresponding guard
