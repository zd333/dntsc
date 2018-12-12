import { IsString, MinLength } from 'class-validator';

export class SignInEmployeeInDto {
  @MinLength(3)
  @IsString()
  readonly login: string;

  @IsString()
  @MinLength(4)
  readonly password: string;
}
