import { classToPlain, plainToClass } from 'class-transformer';
import { Document } from 'mongoose';

/**
 * Takes MongoDB document and converts it to output DTO.
 * Does this via class-transformer double conversion, thus DTO constructor has to be passed too.
 * Removed `_` prefixes (so that `_id` becomes `id`).
 * Excludes all properties by default, thus all properties of DTO must be decorated with `Expose`.
 */
export function convertDocumentToOutDto<T>(
  OutDtoClassConstructor: {
    new (...args: any[]): T;
  },
  document: Document,
): T {
  const dtoClass = plainToClass(OutDtoClassConstructor, document, {
    strategy: 'excludeAll',
    excludePrefixes: ['_'],
  });

  return classToPlain(dtoClass) as T;
}
