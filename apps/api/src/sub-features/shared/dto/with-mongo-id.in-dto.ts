import { IsMongoId } from 'class-validator';

/**
 * Class needed for validation purposes of typical get by id routes,
 * where id must be MongoDB id.
 * Use this in `getById` controller methods to get automatic validation and error messages.
 */
export class WithMongoIdInDto {
  @IsMongoId({ message: 'URL path param must be valid id' })
  readonly id: string;
}
