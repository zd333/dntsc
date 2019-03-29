/**
 * This is for convenient work with tuple types.
 * Always try to avoid enums and use tuples.
 */
export type Lit = string | number | boolean | undefined | null | void | {};
export const tuple = <T extends Array<Lit>>(...args: T) => args;
