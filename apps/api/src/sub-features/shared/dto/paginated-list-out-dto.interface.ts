/**
 * class-transformer does does not support generics,
 * thus have to use interface instead of class with exposed props.
 * All serialization logic (decorators) should be defined in target dto (single) item class.
 * All endpoints that return list of items must implement this interface.
 */
export interface PaginatedListOutDto<SingleDtoItem> {
  readonly results: Array<SingleDtoItem>;

  readonly skipped: number;

  readonly totalCount: number;
}
