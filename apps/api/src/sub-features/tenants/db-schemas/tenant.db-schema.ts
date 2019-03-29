import { Document, Schema, SchemaDefinition } from 'mongoose';
import { tuple } from '../../shared/helpers/tuple';

export const TENANT_SCHEMA_COLLECTION_NAME = 'Tenants';

export const allPlatformFeatures = tuple('INVENTORY');

export type PlatformFeatures = typeof allPlatformFeatures[number];

const schemaDefinition: SchemaDefinition = {
  name: { type: String, required: true },
  features: [{ type: String, enum: allPlatformFeatures, required: false }],
};

export type TenantDocument = Readonly<Document> & {
  readonly name: string;
  readonly features?: Array<PlatformFeatures>;
};

export const TenantSchema = new Schema(schemaDefinition);
