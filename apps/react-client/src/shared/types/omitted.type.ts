/**
 * Just helper type to narrow properties of original type.
 */
export type Omitted<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
