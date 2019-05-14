import { ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsNumberString,
  IsOptional,
  NotContains,
  IsIn,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

const SEARCH_STRING_MIN_LENGTH = 3;

export class QueryParamsForPaginatedListInDto {
  @IsOptional()
  // TODO: create custom validator IsPositiveIntegerString
  @IsNumberString()
  @NotContains('-')
  @NotContains('.')
  @NotContains(',')
  @ApiModelPropertyOptional({
    type: Number,
  })
  public readonly skip?: string;

  @IsOptional()
  // TODO: create custom validator IsPositiveIntegerString
  @IsNumberString()
  @NotContains('-')
  @NotContains('.')
  @NotContains(',')
  @ApiModelPropertyOptional({
    type: Number,
  })
  public readonly limit?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiModelPropertyOptional()
  public readonly orderBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @ApiModelPropertyOptional({
    enum: ['ASC', 'DESC'],
  })
  public readonly orderDirection?: 'ASC' | 'DESC';
}

export class QueryParamsForSearchablePaginatedListInDto extends QueryParamsForPaginatedListInDto {
  @IsOptional()
  @IsString()
  @MinLength(SEARCH_STRING_MIN_LENGTH)
  @ApiModelPropertyOptional({
    minLength: SEARCH_STRING_MIN_LENGTH,
  })
  public readonly searchString?: string;
}
