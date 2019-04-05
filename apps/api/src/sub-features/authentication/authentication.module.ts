import { AuthenticationController } from './controllers/authentication.controller';
import { AuthenticationService } from './services/authentication.service';
import { EmployeesModule } from '../employees/employees.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtPassportStrategy } from './services/jwt-passport-strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';

const sessionExpirationTimeout = Number(process.env.USER_SESSION_EXPIRATION);

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: sessionExpirationTimeout,
      },
    }),
    EmployeesModule,
    SharedModule,
  ],
  providers: [
    AuthenticationService,
    JwtPassportStrategy,
    {
      provide: 'USER_SESSION_EXPIRATION',
      useValue: sessionExpirationTimeout,
    },
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
