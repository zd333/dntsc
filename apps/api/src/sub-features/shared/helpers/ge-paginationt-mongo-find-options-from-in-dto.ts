import { QueryParamsForPaginatedListInDto } from '../dto/query-params-for-paginated-list.in-dto';

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
    const orderDirection = dto.orderDirection === 'DESC' ? -1 : 1;
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
