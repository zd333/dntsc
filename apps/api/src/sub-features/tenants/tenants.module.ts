import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TENANT_SCHEMA_NAME, TenantSchema } from './models/tenant.model';
import { TenantsService } from './services/tenants.service';

const schemasMap = [
  {
    name: TENANT_SCHEMA_NAME,
    schema: TenantSchema,
  },
];

@Module({
  providers: [TenantsService],
  imports: [MongooseModule.forFeature(schemasMap)],
})
export class TenantsModule {}
