import { InDtoWithClinicContext } from 'src/middlewares/add-clinic-context.middleware';
import { IsString, MinLength } from 'class-validator';

export class SignInEmployeeInDtoWithClinicContext extends InDtoWithClinicContext {
  @MinLength(3)
  @IsString()
  readonly login: string;

  @IsString()
  @MinLength(4)
  readonly password: string;
}

/**
 * DTO type for clients.
 */
export type SignInEmployeeInDto = Pick<
  SignInEmployeeInDtoWithClinicContext,
  Exclude<keyof SignInEmployeeInDtoWithClinicContext, 'targetClinicId'>
>;
