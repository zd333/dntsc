import { IsString, MinLength } from 'class-validator';

export class SignInPlatformOwnerInDto {
  @MinLength(3)
  @IsString()
  public readonly login: string;

  @IsString()
  @MinLength(4)
  public readonly password: string;
}
