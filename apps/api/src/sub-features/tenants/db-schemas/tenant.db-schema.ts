import { Document, Schema, SchemaDefinition } from 'mongoose';

export const TENANT_SCHEMA_COLLECTION_NAME = 'Tenants';

// TODO: replace with tuple
export enum PlatformFeatures {
  inventory = 'INVENTORY',
}
const platformFeatureValues: Array<PlatformFeatures> = Object.keys(
  PlatformFeatures,
).map(key => PlatformFeatures[key]);

const schemaDefinition: SchemaDefinition = {
  name: { type: String, required: true },
  features: [{ type: String, enum: platformFeatureValues, required: false }],
};

export type TenantDocument = Readonly<Document> & {
  readonly name: string;
  readonly features?: Array<PlatformFeatures>;
};

export const TenantSchema = new Schema(schemaDefinition);
