import { Expose } from 'class-transformer';

export class SignedInEmployeeOutDto {
  @Expose()
  public readonly authToken: string;

  @Expose()
  public readonly hasToChangePassword?: boolean;
}
