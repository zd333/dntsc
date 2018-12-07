import { Schema, SchemaDefinition } from 'mongoose';
import { TENANT_SCHEMA_NAME } from '../../tenants/db-entities/tenant.db-entity';

const schemaDefinition: SchemaDefinition = {
  name: { type: String, required: true },
  tenant: {
    type: Schema.Types.ObjectId,
    ref: TENANT_SCHEMA_NAME,
    index: true,
    required: true,
  },
};
export const ClinicSchema = new Schema(schemaDefinition);
export const CLINIC_SCHEMA_NAME = 'Clinic';
