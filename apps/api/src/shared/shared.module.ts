import { IsIdOfExistingDbEntity } from './validators/is-id-of-existing-db-entity.validator';
import { Module } from '@nestjs/common';

const providers = [IsIdOfExistingDbEntity];

@Module({
  providers,
  exports: providers,
})
export class SharedModule {}
