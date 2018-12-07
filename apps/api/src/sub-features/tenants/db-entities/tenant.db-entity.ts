import { Schema, SchemaDefinition } from 'mongoose';

const schemaDefinition: SchemaDefinition = {
  name: { type: String, index: true, unique: true, required: true },
};
export const TenantSchema = new Schema(schemaDefinition);
export const TENANT_SCHEMA_NAME = 'Tenant';
