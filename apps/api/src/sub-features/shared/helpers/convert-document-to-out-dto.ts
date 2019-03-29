import { classToPlain, plainToClass } from 'class-transformer';
import { Document } from 'mongoose';

export interface DtoConstructor<T> {
  // This is generic, so really any :)
  /* tslint:disable-next-line:no-any */
  new (...args: Array<any>): T;
}

/**
 * Takes MongoDB document and converts it to output DTO.
 * Does this via class-transformer double conversion, thus DTO constructor has to be passed too.
 * Removes `_` prefixes (so that `_id` becomes `id`).
 * Excludes all properties by default, thus all properties of DTO must be decorated with `Expose`.
 */
export function convertDocumentToOutDto<T>(params: {
  readonly dtoConstructor: DtoConstructor<T>;
  readonly document: Document;
}): T {
  const { dtoConstructor: OutDtoClassConstructor, document } = params;
  const dtoClass = plainToClass(OutDtoClassConstructor, document, {
    strategy: 'excludeAll',
    excludePrefixes: ['_'],
  });

  return classToPlain(dtoClass) as T;
}
