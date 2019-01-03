import { InDtoWithClinicContext } from 'src/middlewares/add-clinic-context.middleware';
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
  readonly skip?: string;

  @IsOptional()
  // TODO: create custom validator IsPositiveIntegerString
  @IsNumberString()
  @NotContains('-')
  @NotContains('.')
  @NotContains(',')
  readonly limit?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly orderBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  readonly orderDirection?: 'ASC' | 'DESC';

  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly searchString?: string;
}
