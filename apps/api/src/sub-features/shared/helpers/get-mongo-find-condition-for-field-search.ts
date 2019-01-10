/**
 * Generates object that can be used as find condition Mongoose find query.
 * Query results will contain documents that have target field which
 * includes search string (case-insensitive).
 */
export function getMongoFindConditionForFieldSearch(params: {
  readonly fieldName: string;
  readonly searchString: string;
}): { [key: string]: any } {
  const { fieldName, searchString } = params;

  return {
    [fieldName]: {
      $regex: `.*${searchString}.*`,
      $options: 'i',
    },
  };
}
