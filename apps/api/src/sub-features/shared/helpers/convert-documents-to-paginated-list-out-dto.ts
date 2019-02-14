import { Document } from 'mongoose';
import { PaginatedListOutDto } from '../dto/paginated-list-out-dto.interface';
import {
  DtoConstructor,
  convertDocumentToOutDto,
} from './convert-document-to-out-dto';

/**
 * Takes list of MongoDB documents and converts it to paginated list output DTO.
 * Requires DTO constructor of single list item,
 * will apply `convertDocumentToOutDto` to each document from passed array.
 * All serialization features (decorators) must be defined in this single items DTO constructor due to
 * class-transformer does not support generics (see `PaginatedListOutDto`) for details.
 */
export function convertDocumentsToPaginatedListOutDto<
  T,
  U extends Document
>(params: {
  readonly singleDtoItemConstructor: DtoConstructor<T>;
  readonly findResults: MongoFindResults<U>;
}): PaginatedListOutDto<T> {
  const {
    singleDtoItemConstructor,
    findResults: { documents, skipped, totalCount },
  } = params;
  const items = documents.map(document =>
    convertDocumentToOutDto({
      document,
      dtoConstructor: singleDtoItemConstructor,
    }),
  );

  return {
    items,
    skipped,
    totalCount,
  };
}

export interface MongoFindResults<T extends Document = Document> {
  readonly documents: Array<T>;
  readonly skipped: number;
  readonly totalCount: number;
}
