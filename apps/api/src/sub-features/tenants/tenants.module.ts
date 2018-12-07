import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantsController } from './controllers/tenants.controller';
import { TenantsDbConnectorService } from './services/tenants-db-connector.service';
import {
  TENANT_SCHEMA_NAME,
  TenantSchema,
} from './db-entities/tenant.db-entity';

const schemasMap = [
  {
    name: TENANT_SCHEMA_NAME,
    schema: TenantSchema,
  },
];

@Module({
  imports: [MongooseModule.forFeature(schemasMap)],
  providers: [TenantsDbConnectorService],
  controllers: [TenantsController],
})
export class TenantsModule {}
