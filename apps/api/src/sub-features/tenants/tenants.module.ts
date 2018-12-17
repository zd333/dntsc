import { IsUniqueTenantNameValidator } from './validators/is-unique-tenant-name.validator';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { TenantsController } from './controllers/tenants.controller';
import { TenantsDbConnectorService } from './services/tenants-db-connector.service';
import {
  TENANT_SCHEMA_COLLECTION_NAME,
  TenantSchema,
} from './db-schemas/tenant.db-schema';

const schemasMap = [
  {
    name: TENANT_SCHEMA_COLLECTION_NAME,
    collection: TENANT_SCHEMA_COLLECTION_NAME,
    schema: TenantSchema,
  },
];

@Module({
  imports: [
    MongooseModule.forFeature(schemasMap),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [TenantsDbConnectorService, IsUniqueTenantNameValidator],
  controllers: [TenantsController],
  exports: [TenantsDbConnectorService],
})
export class TenantsModule {}
