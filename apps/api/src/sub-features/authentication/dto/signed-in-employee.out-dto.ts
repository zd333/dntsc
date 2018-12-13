import { Expose } from 'class-transformer';

export class SignedInEmployeeOutDto {
  @Expose()
  readonly authToken: string;

  @Expose()
  readonly hasToChangePassword?: boolean;
}
