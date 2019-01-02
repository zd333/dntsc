import { QueryParamsForPaginatedListInDto } from '../dto/query-params-for-paginated-list.in-dto';

/**
 * Takes generic DTO for paginated resource and returns object to use in Mongo find query.
 * !Ignores `searchString` param of DTO, because it is entity-specific and can not be processes in generic way.
 * !Search options must be handled on the consuming code side!
 */
export function getPaginationMongoFindOptionsFromDto(
  dto: QueryParamsForPaginatedListInDto,
): PaginationMongoFindOptions {
  if (!dto) {
    return {};
  }

  let result: PaginationMongoFindOptions = {};
  if (dto.limit) {
    result = {
      ...result,
      limit: Number(dto.limit),
    };
  }
  if (dto.skip) {
    result = {
      ...result,
      skip: Number(dto.skip),
    };
  }
  if (dto.orderBy) {
    const orderDirection = dto.orderDirection.toUpperCase() === 'DESC' ? -1 : 1;
    result = {
      ...result,
      sort: { [dto.orderBy]: orderDirection },
    };
  }

  return result;
}

interface PaginationMongoFindOptions {
  readonly limit?: number;
  readonly skip?: number;
  readonly sort?: {
    [key: string]: 1 | -1;
  };
}
