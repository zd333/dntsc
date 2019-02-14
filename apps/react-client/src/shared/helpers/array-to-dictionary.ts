/**
 * Use this to work with normalized state pieces.
 */
export function arrayToDictionary<T>(
  array: Array<T>,
  indexKey: keyof T,
): {
  readonly [indexKeyValue: string]: T;
} {
  let normalizedObject: {
    readonly [indexKeyValue: string]: T;
  } = {};

  for (const arrayItem of array) {
    // Thank you TypeScript
    const keyValue: unknown = arrayItem[indexKey];
    normalizedObject = {
      ...normalizedObject,
      [keyValue as string]: arrayItem,
    };
  }

  return normalizedObject;
}
