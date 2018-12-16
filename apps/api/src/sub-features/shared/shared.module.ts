import { IsInClinicContext } from './guards/is-in-clinic-context.guard';
import { Module } from '@nestjs/common';

/**
 * Contains shared stuff which is used across multiple app modules.
 */
@Module({
  providers: [IsInClinicContext],
  exports: [IsInClinicContext],
})
export class SharedModule {}
