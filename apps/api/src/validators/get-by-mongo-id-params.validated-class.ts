import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

/**
 * Class needed for validation purposes of typical get by id routes,
 * where id must be MongoDB id.
 * Use this in `getById` controller methods to get automatic validation and error messages.
 */
export class GetByMongoIdParams {
  @IsMongoId({ message: 'URL path param must be valid id' })
  id: Types.ObjectId | any;
}
