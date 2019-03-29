import { Document, Model } from 'mongoose';
import { MongoFindResults } from './convert-documents-to-paginated-list-out-dto';
import { PaginationMongoFindOptions } from './get-pagination-mongo-find-options-from-in-dto';

const MAX_ITEMS_IN_RESPONSE = 1024;

/**
 * Runs find query on passed Mongoose model with passed params, also ensures there will be not more
 * than `MAX_ITEMS_IN_RESPONSE` results. If so - then automatically limits number of results.
 */
export async function runMongoPaginatedQueryWithAutoLimit<
  T extends Readonly<Document>
>(params: {
  // No 3-rd typings and hard to type, thus any
  /* tslint:disable-next-line:no-any */
  readonly findConditions: { readonly [key: string]: any };
  readonly findOptions: PaginationMongoFindOptions;
  readonly model: Model<T>;
}): Promise<MongoFindResults<T>> {
  const { findConditions, findOptions, model } = params;
  const totalCount = await model.estimatedDocumentCount().exec();
  const numberOfRequestedItems =
    findOptions.limit || totalCount - (findOptions.skip || 0);
  const effectiveLimit =
    numberOfRequestedItems < MAX_ITEMS_IN_RESPONSE
      ? findOptions.limit
      : MAX_ITEMS_IN_RESPONSE;
  const effectiveFindOptions = {
    ...findOptions,
    limit: effectiveLimit,
  };
  const documents = await model
    .find(findConditions, null, effectiveFindOptions)
    .exec();
  const skipped = effectiveFindOptions.skip || 0;

  return { documents, skipped, totalCount };
}
