import { AuthenticationService } from './services/authentication.service';
import { EmployeesModule } from '../employees/employees.module';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    EmployeesModule,
  ],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}

// TODO: implement authentication controller with sign in employee method
