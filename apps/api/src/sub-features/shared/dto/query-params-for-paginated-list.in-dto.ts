import {
  IsNumberString,
  IsOptional,
  NotContains,
  IsIn,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class QueryParamsForPaginatedListInDto {
  @IsOptional()
  // TODO: create custom validator IsPositiveIntegerString
  @IsNumberString()
  @NotContains('-')
  @NotContains('.')
  @NotContains(',')
  public readonly skip?: string;

  @IsOptional()
  // TODO: create custom validator IsPositiveIntegerString
  @IsNumberString()
  @NotContains('-')
  @NotContains('.')
  @NotContains(',')
  public readonly limit?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly orderBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  public readonly orderDirection?: 'ASC' | 'DESC';
}

export class QueryParamsForSearchablePaginatedListInDto extends QueryParamsForPaginatedListInDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  public readonly searchString?: string;
}
