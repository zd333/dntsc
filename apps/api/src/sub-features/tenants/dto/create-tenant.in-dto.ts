import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTenantInDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
