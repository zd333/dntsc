import { Module } from '@nestjs/common';
import { RequesterIsEmployeeOfTargetClinicGuard } from './guards/requester-is-employee-of-target-clinic.guard';
import { RequestIsInClinicContextGuard } from './guards/request-is-in-clinic-context.guard';

const guards = [
  RequestIsInClinicContextGuard,
  RequesterIsEmployeeOfTargetClinicGuard,
];

/**
 * Contains shared stuff which is used across multiple app modules.
 */
@Module({
  providers: [...guards],
  exports: [...guards],
})
export class SharedModule {}
