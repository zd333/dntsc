import { IsString, MinLength } from 'class-validator';

export class CreateTenantInDto {
  @MinLength(3)
  @IsString()
  // TODO: implement and add custom validator that checks if this name does not exist yet
  // IsUnique
  readonly name: string;
}
