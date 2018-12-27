import { Schema, SchemaDefinition } from 'mongoose';
import { TENANT_SCHEMA_COLLECTION_NAME } from '../../tenants/db-schemas/tenant.db-schema';

export const CLINIC_SCHEMA_COLLECTION_NAME = 'Clinics';

const schemaDefinition: SchemaDefinition = {
  name: { type: String, required: true },
  tenant: {
    type: Schema.Types.ObjectId,
    ref: TENANT_SCHEMA_COLLECTION_NAME,
    required: true,
  },
  hostNames: { type: [String], required: true },
};
export const ClinicSchema = new Schema(schemaDefinition);
