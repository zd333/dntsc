import { IsEmployeeGuard } from './guards/is-employee.guard';
import { IsInClinicContextGuard } from './guards/is-in-clinic-context.guard';
import { Module } from '@nestjs/common';

const guards = [IsInClinicContextGuard, IsEmployeeGuard];

/**
 * Contains shared stuff which is used across multiple app modules.
 */
@Module({
  providers: [...guards],
  exports: [...guards],
})
export class SharedModule {}
