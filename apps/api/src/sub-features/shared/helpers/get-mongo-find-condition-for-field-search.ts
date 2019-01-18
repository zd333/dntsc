/**
 * Generates object that can be used as find condition Mongoose find query.
 * Query results will contain documents that have target field which
 * includes search string (case-insensitive).
 */
export function getMongoFindConditionForFieldSearch(params: {
  readonly fieldName: string;
  readonly searchString: string;
  // No 3-rd typings and hard to type, thus any
  /* tslint:disable-next-line:no-any */
}): { readonly [key: string]: any } {
  const { fieldName, searchString } = params;

  return {
    [fieldName]: {
      $regex: `.*${searchString}.*`,
      $options: 'i',
    },
  };
}
