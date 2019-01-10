import { InDtoWithClinicContext } from 'src/middlewares/add-clinic-context.middleware';
import { IsString, MinLength } from 'class-validator';

export class SignInEmployeeInDto extends InDtoWithClinicContext {
  @MinLength(3)
  @IsString()
  readonly login: string;

  @IsString()
  @MinLength(4)
  readonly password: string;
}
