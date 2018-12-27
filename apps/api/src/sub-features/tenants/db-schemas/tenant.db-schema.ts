import { Schema, SchemaDefinition } from 'mongoose';

export const TENANT_SCHEMA_COLLECTION_NAME = 'Tenants';

const schemaDefinition: SchemaDefinition = {
  name: { type: String, required: true },
};
export const TenantSchema = new Schema(schemaDefinition);

// TODO: add inventory feature is enabled or not info prop
